import { Router } from "express";
import {
  createReview,
  deleteReview,
  updateReview,
} from "../controller/review.controller";

const reviewRouter = Router();

reviewRouter.post("/", createReview);
reviewRouter.patch("/", updateReview);
reviewRouter.delete("/:id", deleteReview);

export default reviewRouter;
