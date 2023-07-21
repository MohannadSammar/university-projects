import { Product } from "../entity/Product";
import { getRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { getEbayObject } from "../util/api_conn";
import { process_data_keywordSearch } from "../util/datafilter";

interface ProductWithRating extends Product {
  rating?: number;
}

// Searches items by keyword/s
export const serachProducts = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(400).json({
      status: "unauthorized",
      message: "Login first",
    });
    return;
  }

  try {
    const { keyword } = req.params;
    const productRepository: Repository<Product> = getRepository(Product);
    const keywordInject = { keyword: `%${keyword.toLowerCase()}%` };
    const products = await productRepository
      .createQueryBuilder("product")

      .leftJoin("product.reviews", "review")
      .select("product")
      .addSelect("AVG(review.rating)", "rating")

      .loadRelationCountAndMap(
        "product.liked",
        "product.users",
        "liked",
        (qb) => {
          if (!req.user) return qb;
          return qb.andWhere("liked.id = :id", { id: req.user.id });
        }
      )

      .leftJoinAndMapMany("product.variants", "product.variants", "variant")
      .where("LOWER(product.name) LIKE :keyword ", keywordInject)
      .orWhere("LOWER(product.manufacturer) LIKE :keyword", keywordInject)
      .orWhere("LOWER(variant.name) LIKE :keyword", keywordInject)

      .groupBy("product.id")
      .addGroupBy("variant.id")

      .loadAllRelationIds({
        relations: ["category"],
      })
      .getRawAndEntities();

    //Combine ratings from rwa result with entities
    const processedProducts = products.entities.map<ProductWithRating>(
      (product) => {
        return {
          ...product,
          rating:
            products.raw.find((record) => record.product_id == product.id)
              ?.rating || 0,
        };
      }
    );

    res.json({
      status: "success",
      count: processedProducts.length,
      products: processedProducts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
    });
  }
};

// Get an product by id
export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const productRepository: Repository<Product> = getRepository(Product);

  const product = await productRepository
    .createQueryBuilder("product")

    .leftJoin("product.reviews", "review")
    .loadRelationCountAndMap("product.likes", "product.users")
    .leftJoinAndSelect("product.variants", "variant")
    .leftJoinAndSelect("variant.attributes", "attribute_var")
    .leftJoinAndSelect("product.attributes", "attribute")

    .addSelect("AVG(review.rating)", "rating")

    .where("product.id = :id ", { id })

    .groupBy("product.id")
    .addGroupBy("variant.id")
    .addGroupBy("attribute.id")
    .addGroupBy("attribute_var.id")

    .loadAllRelationIds({
      relations: ["category"],
    })
    .getRawAndEntities();

  //Combine ratings from rwa result with entities
  const processedProduct = {
    ...product.entities[0],
    rating: product.raw[0]?.rating || 0,
  };

  res.status(200).json({
    status: "success",
    product: processedProduct,
  });
};

//Gets Product offers from ebay
export const getProductOffers = async (req: Request, res: Response) => {
  const { id } = req.params;
  const offset: number = parseInt("" + req.query.offset) || 0;

  const productRepository: Repository<Product> = getRepository(Product);
  const product = await productRepository.findOne({ id: id });
  const ebay = getEbayObject();

  if (offset % 10 != 0) {
    res.status(500).json({
      status: "Error",
      message: "Offset must be % 10 = 0",
    });
    return;
  }

  if (product) {
    const apiData = await ebay.findItemsByKeywords({
      keywords: product.manufacturer + " " + product.name,
      Condition: 1000, // new
      topRatedSeller: true,
      pageNumber: offset / 10 + 1,
      entriesPerPage: 10,
    });

    const processedData: EbayProductOffer[] =
      process_data_keywordSearch(apiData);

    res.status(200).json({
      status: "success",
      offers: processedData,
    });
  } else {
    res.status(500).json({
      status: "Error",
      message: "Product with provided identifier was not found",
    });
  }
};

export const getCrads = async (req: Request, res: Response) => {
  const { categoryId, productId, seed, offset = 0 } = req.body;

  const productRepository: Repository<Product> = getRepository(Product);
  const productQuery = productRepository.createQueryBuilder("product");

  if (categoryId) {
    productQuery.where("product.categoryId = :categoryId", { categoryId });
  }

  if (productId) {
    productQuery
      .orderBy(`IF(product.id = :productId, 1, 2)`)
      .setParameter("productId", productId)
      .addOrderBy("RAND(:seed)");
  } else {
    productQuery.orderBy("RAND(:seed)");
  }

  const products = await productQuery
    .leftJoin("product.reviews", "review")
    .loadRelationCountAndMap("product.likes", "product.users")
    .select("product")
    .addSelect("AVG(review.rating)", "rating")
    .groupBy("product.id")
    .limit(3)
    .offset(offset)
    .setParameter(
      "seed",
      seed && Number.isInteger(seed) ? seed : Math.floor(Math.random() * 1000)
    )
    .getRawAndEntities();

  const processedProducts = products.entities.map<ProductWithRating>(
    (product) => {
      return {
        ...product,
        rating:
          products.raw.find((record) => record.product_id == product.id)
            ?.rating || 0,
      };
    }
  );

  res.status(200).json({
    offset,
    seed: seed && Number.isInteger(seed) ? seed : null,
    count: products.raw.length,
    isMore: products.raw.length == 3,
    products: processedProducts,
  });
};

export const likeProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userRepository = getRepository(User);
  const productRepository = getRepository(Product);

  if (id == null) {
    res.status(400).json({
      status: "Error",
      message: "ProductId can not be NULL",
    });
    return;
  }

  if (!req.user) {
    res.status(400).json({
      status: "unauthorized",
      message: "Not authenticated",
    });
    return;
  }

  //User und Product aus der Datenbank holen und sie zusammenführen
  // als Response bei erfolgreichem Like erhält man das JSON-Objekt "UpdatedUser"
  try {
    const user = await userRepository.findOneOrFail(req.user.id, {
      relations: ["products"],
    });

    const index = user.products.findIndex((product) => product.id == id);
    if (index != -1) {
      res.status(400).json({
        status: "Error",
        message: "Already liked by user!",
      });
      return;
    }

    const product = await productRepository.findOneOrFail(id);

    user.products.push(product);

    await userRepository.save(user);

    res.status(200).json({
      status: "success",
    });
    return;
  } catch (error) {
    res.status(404).send({
      message: "User kann nicht geupdatet werden",
    });
  }
};

export const dislikeProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userRepository = getRepository(User);

  if (id == null) {
    res.status(400).json({
      status: "Error",
      message: "ProductId can not be NULL",
    });
    return;
  }

  if (!req.user) {
    res.status(400).json({
      status: "unauthorized",
      message: "Not authenticated",
    });
    return;
  }

  try {
    const user = await userRepository.findOneOrFail(req.user.id, {
      relations: ["products"],
    });

    const index = user.products.findIndex((product) => product.id == id);
    if (index == -1) {
      res.status(400).json({
        status: "Error",
        message: "Is not liked by user!",
      });
      return;
    }

    user.products.splice(index, 1);

    await userRepository.save(user);

    res.status(200).json({
      status: "success",
    });
    return;
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Remove Like failed",
    });
  }
};
