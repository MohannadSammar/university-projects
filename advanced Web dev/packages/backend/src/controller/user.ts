import { Request, Response } from "express";
import { User } from "../entity/User";
import { Product } from "../entity/Product";
import { getRepository } from "typeorm";
import catchAsync from "../util/catchAsync";
import multer from "multer";

export const getMe = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).send({ status: "unauthorized" });
  }

  const user = req.user;
  user.password = undefined;

  res.status(200).send({
    status: "success",
    data: req.user,
  });
});

export const updateUser = async (req: Request, res: Response) => {
  const { name } = req.body;
  const image = req.file?.filename;
  const UserRepository = getRepository(User);

  try {
    const user = req.user;

    if (!user) {
      res.status(404).send({
        status: "error",
        message: "Not authenticated",
      });
      return;
    }

    //checken ob die updatebaren Attribute gesetzt sind
    if (name != null) {
      user.name = name;
    }
    if (image != null) {
      user.image = "http://localhost:3010/" + image;
    }

    await UserRepository.save(user);

    user.password = undefined;

    res.status(200).send({
      status: "success",
      updatedUser: user,
    });
  } catch (error) {
    res.status(404).send({
      status: "error",
      message: "User can not be updated",
    });
  }
};

export const getAllProductsLiked = async (req: Request, res: Response) => {
  const UserRepository = getRepository(User);
  const ProductRepository = getRepository(Product);

  if (!req.user) {
    res.status(404).send({
      status: "error",
      message: "Not authenticated",
    });
    return;
  }

  //User mit Produkten joinen
  try {
    const likedProducts = await UserRepository.createQueryBuilder("user")
      .leftJoinAndSelect("user.products", "products")
      .leftJoinAndSelect("products.category", "category")
      .where({ id: req.user.id })
      .getOneOrFail();

    const products: ProductRawAndEntity[] = [];

    for (const element of likedProducts.products) {
      const product = await ProductRepository.createQueryBuilder("product")
        .leftJoin("product.reviews", "review")
        .loadRelationCountAndMap("product.likes", "product.users")
        .select("product")
        .addSelect("AVG(review.rating)", "rating")
        .where(`product.id = '${element.id}'`)
        .groupBy("product.id")
        .getRawAndEntities();

      products.push(product);
    }

    // join products with category, likes, rating
    const productsExtended: ProductExpanded[] = [];

    for (let i = 0; i < likedProducts.products.length; i++) {
      const product: ProductExpanded = {
        id: likedProducts.products[i].id,
        name: likedProducts.products[i].name,
        image: likedProducts.products[i].image,
        manufacturer: likedProducts.products[i].manufacturer,
        price: likedProducts.products[i].price,
        category: likedProducts.products[i].category,
        rating: products[i].raw[0].rating,
        likes: products[i].entities[0].likes,
      };
      productsExtended.push(product);
    }

    res.send({
      status: "success",
      products: productsExtended,
    });
  } catch (error) {
    res.status(400).send({
      status: "Bad Request Error",
      message: "UserID doesnt exist",
    });
  }
};

export const getAllReviewedProducts = async (req: Request, res: Response) => {
  const UserRepository = await getRepository(User);

  if (!req.user) {
    res.status(404).send({
      status: "error",
      message: "Not authenticated",
    });
    return;
  }

  try {
    const user = await UserRepository.findOneOrFail(req.user.id, {
      relations: ["reviews", "reviews.product"],
    });

    res.status(200).json({
      status: "success",
      reviews: user.reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "Bad Request Error",
      message: "UserID doesnt exist",
    });
  }
};

//Image multer middleware
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const uploadImage = multer({
  storage: storage,
  fileFilter: fileFilter,
});
