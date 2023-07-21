import { Router } from "express";
import { getVariantOffers } from "../controller/variant";
import { getReviewsForVariants } from "../controller/review.controller";

const variantRouter = Router();

variantRouter.get("/:id/reviews", getReviewsForVariants);
variantRouter.get("/:id/offers", getVariantOffers);

export default variantRouter;
