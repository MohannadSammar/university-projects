import { Request, Response, Router } from "express";
import authRouter from "./auth.router";
import productRouter from "./product.router";
import categotyRouter from "./category.router";
import reviewRouter from "./review.router";
import userRouter from "./user.router";
import { protect } from "../controller/auth";
import variantRouter from "./variant.router";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    status: "success",
    version: "1.0.0",
    info: "API for Tech Tinder.",
  });
});

router.use(authRouter);

router.use(protect);

router.use("/products", productRouter);
router.use("/variants", variantRouter);
router.use("/categories", categotyRouter);
router.use("/reviews", reviewRouter);
router.use("/me", userRouter);

export default router;
