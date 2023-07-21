import { Router } from "express";
import {
  getAllReviewedProducts,
  getAllProductsLiked,
  updateUser,
  getMe,
  uploadImage,
} from "../controller/user";

const userRouter = Router();

userRouter.get("/", getMe);
userRouter.patch("/", uploadImage.single("image"), updateUser);

userRouter.get("/likes", getAllProductsLiked);
userRouter.get("/reviews", getAllReviewedProducts);

export default userRouter;
