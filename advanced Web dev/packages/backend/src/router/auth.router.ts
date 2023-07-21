import { Router } from "express";
import {
  login,
  logout,
  protect,
  signUp,
  updatePassword,
} from "../controller/auth";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/signup", signUp);

authRouter.post("/logout", protect, logout);
authRouter.patch("/updatePassword", protect, updatePassword);

export default authRouter;
