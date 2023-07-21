import { Router } from "express";

import { getReviewsForProduct } from "../controller/review.controller";

import {
  serachProducts,
  getProduct,
  getCrads,
  likeProduct,
  getProductOffers,
  dislikeProduct,
} from "../controller/product";

const productRouter = Router();

productRouter.post("/cards", getCrads);

productRouter.get("/:id/offers", getProductOffers);
productRouter.get("/search/:keyword", serachProducts);
productRouter.get("/:id", getProduct);

productRouter.get("/:id/like", likeProduct);
productRouter.get("/:id/dislike", dislikeProduct);

productRouter.get("/:id/reviews", getReviewsForProduct);

export default productRouter;
