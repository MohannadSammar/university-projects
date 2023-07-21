import { getRepository, Repository } from "typeorm";
import { Category } from "../entity/Category";
import { Request, Response } from "express";

export const getItemsByCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const categoryRepo: Repository<Category> = getRepository(Category);
  const category = await categoryRepo.findOneOrFail(id, {
    relations: ["products"],
  });

  res.json({
    status: "success",
    count: category.products.length,
    products: category.products,
  });
};

export const getAll = async (req: Request, res: Response) => {
  const categoryRepo: Repository<Category> = getRepository(Category);
  const categories = await categoryRepo.find();

  res.json({
    status: "success",
    count: categories.length,
    categories,
  });
};
