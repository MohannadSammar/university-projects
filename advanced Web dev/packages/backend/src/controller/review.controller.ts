import { Request, Response } from "express";
import { Product } from "../entity/Product";
import { Review } from "../entity/Review";
import { getRepository } from "typeorm";
import { Variant } from "../entity/Variant";

export const createReview = async (req: Request, res: Response) => {
  const { title, text, rating, productId, variantId } = req.body;
  const reviewRepository = getRepository(Review);
  const productRepository = getRepository(Product);
  const variantRepository = getRepository(Variant);

  if (!req.user) {
    res.status(404).send({
      status: "unauthorized",
      message: "Not authenticated",
    });
    return;
  }

  if (!productId || !text || !rating || !title) {
    res.status(404).send({
      status: "bad_request",
      message:
        "Please provide all informations! Title, Text, Rating and Product.",
    });
    return;
  }

  try {
    const review = await reviewRepository
      .createQueryBuilder("review")
      .where("userId = :userId", { userId: req.user.id })
      .andWhere("productId = :productId", { productId })
      .getOne();

    //checken ob der User dieses Produkt schon reviewet hat
    if (review) {
      res.status(400).send({
        status: "error",
        message: "User already reviewed this Product",
      });
      return;
    }

    //neuen Review erstellen mit den Post-Daten
    const newReview = new Review();
    newReview.title = title;
    newReview.text = text;
    newReview.rating = rating;

    //das Produkt aus den Post-Daten in der Datenbank abfragen
    const existingProduct = await productRepository.findOneOrFail(productId);

    //die Variante aus den Post-Daten in der Datenbank abfragen
    let existingVariant: Variant | undefined;
    if (variantId) {
      existingVariant = await variantRepository.findOne(variantId);
    }

    //User,Produkt und Variante dem Review zuweisen
    newReview.user = req.user;
    newReview.product = existingProduct;
    newReview.variant = existingVariant;

    const rev = await reviewRepository.save(newReview);

    res.status(200).send({
      status: "success",
      review: rev,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: "ID doesnt exist and can not be assigned to Review",
    });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  const { id, title, text, rating, variantId } = req.body;
  const ReviewRepository = await getRepository(Review);
  const VariantRepository = getRepository(Variant);

  // den Review aus den Post-Daten in der Datenbank abfragen
  try {
    const existingReview = await ReviewRepository.findOneOrFail(id);
    const variant = await VariantRepository.findOneOrFail(variantId);

    //Review ändern
    if (title != null) {
      existingReview.title = title;
    } else {
      return res.status(500).send({ msg: "Title may not be NULL" });
    }

    if (text != null) {
      existingReview.text = text;
    } else {
      return res.status(500).send({ msg: "Text may not be NULL" });
    }

    if (variant) {
      existingReview.variant = variant;
    }

    if (rating != null) {
      existingReview.rating = rating;
    } else {
      return res.status(500).send({ msg: "Rating may not be NULL" });
    }
    ReviewRepository.save(existingReview);
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
    );
    res.header("Access-Control-Allow-Methods", "PATCH");
    res.status(200).send({
      status: "success",
      review: existingReview,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: "ReviewID doesnt exist and can not be updated",
    });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  const ReviewId = req.params.id;
  const ReviewRepository = await getRepository(Review);

  try {
    const Review = await ReviewRepository.findOneOrFail(ReviewId);
    await ReviewRepository.remove(Review);
    res.status(200).send({
      status: "success",
      message: "successfully deleted Review",
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: "ReviewID doesnt exist and can not be deleted",
    });
  }
};

export const getReviewsForProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const { limit = 10, offset = 0 } = req.query;

  const reviewRepository = getRepository(Review);

  try {
    const reviews = await reviewRepository
      .createQueryBuilder("review")
      .leftJoinAndSelect("review.user", "user")
      .where("review.productId = :productId", { productId })
      .orderBy("review.createdAt", "DESC")
      .limit(Number(limit) || 10)
      .offset(Number(offset) || 0)
      .getMany();

    res.json({
      status: "success",
      reviews: reviews.map((rev) => ({
        ...rev,
        user: {
          name: rev.user.name,
          image: rev.user.image,
          id: rev.user.id,
        },
      })),
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: "error",
      message: "Error while getting Reviews of Product",
    });
  }
};

export const getReviewsForVariants = async (req: Request, res: Response) => {
  const variantId = req.params.id;
  const { limit = 10, offset = 0 } = req.query;

  const reviewRepository = getRepository(Review);

  try {
    const reviews = await reviewRepository
      .createQueryBuilder("review")
      .leftJoinAndSelect("review.user", "user")
      .where("review.variantId = :variantId", { variantId })
      .orderBy("review.createdAt", "DESC")
      .limit(Number(limit) || 10)
      .offset(Number(offset) || 0)
      .getMany();

    res.json({
      status: "success",
      reviews: reviews.map((rev) => ({
        ...rev,
        user: {
          name: rev.user.name,
          image: rev.user.image,
          id: rev.user.id,
        },
      })),
    });
  } catch (error) {
    console.log(error);

    res.status(404).send({
      message: "Error while getting Reviews of Variant",
    });
  }
};
