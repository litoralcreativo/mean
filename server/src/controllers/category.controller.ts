import { Request, Response } from "express";
import { DbManager } from "../../bdd/db";
import { CategoryRequestDTO } from "../models/category.model";
import { CategoryService } from "../services/category.service";

let categoryService: CategoryService;
DbManager.getInstance().subscribe((x) => {
  if (x) categoryService = new CategoryService(x);
});

export const getAllCategories = (req: Request, res: Response) => {
  // We already know this values came as string representation of integers
  // because they where validated in "validatePagination"
  let { page, pageSize } = req.query;

  categoryService
    .getAll({
      page: parseInt(page as string),
      pageSize: parseInt(pageSize as string),
    })
    .subscribe((val) => res.json(val));
};

export const getCategoryById = (req: Request, res: Response) => {
  const categoryId = req.params.id;
  categoryService.getById(categoryId).subscribe((val) => {
    if (!val) {
      res.status(404).json({ message: "Category not found" });
    } else {
      res.status(200).json(val);
    }
  });
};

export const createCategory = (req: Request, res: Response) => {
  const newCategory: CategoryRequestDTO = req.body;
  categoryService
    .createOne(newCategory)
    .subscribe((val: any) => res.status(200).send(val));
};

export const updateCategoryById = (req: Request, res: Response) => {
  const categoryId = req.params.id;
  const category: CategoryRequestDTO = req.body;
  if (req.body._id) {
    return res
      .status(400)
      .json({ message: "Including _id in the request body is not allowed" });
  }
  categoryService.updateOne(categoryId, category).subscribe((result) => {
    if (!result.acknowledged) {
      res
        .status(500)
        .json({ message: "The DB culden't confirm the modification" });
    } else {
      if (result.matchedCount === 0) {
        res.status(404).json({ message: "Category not found" });
      } else {
        res.status(200).send(result.modifiedCount.toString());
      }
    }
  });
};

export const deleteCategoryById = (req: Request, res: Response) => {
  const categoryId = req.params.id;
  categoryService.deleteOne(categoryId).subscribe((result) => {
    if (!result.acknowledged) {
      res
        .status(500)
        .json({ message: "The DB culden't confirm the modification" });
    } else {
      if (result.deletedCount === 0) {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(200).send(result.deletedCount.toString());
      }
    }
  });
};
