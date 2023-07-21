import { Router } from "express";
import { getAll, getItemsByCategory } from "../controller/category";

const categotyRouter = Router();

categotyRouter.get("/", getAll);
categotyRouter.get("/:id/products", getItemsByCategory);

export default categotyRouter;
