import { Request, Response } from "express";
import { DbManager } from "../../bdd/db";
import { ProductRequestDTO } from "../models/product.model";
import { ProductService } from "../services/product.service";

let productService: ProductService;
DbManager.getInstance().subscribe((x) => {
  if (x) productService = new ProductService(x);
});

export const getAllProducts = (req: Request, res: Response) => {
  // We already know this values came as string representation of integers
  // because they where validated in "validatePagination"
  let { page, pageSize } = req.query;

  productService
    .getAll({
      page: parseInt(page as string),
      pageSize: parseInt(pageSize as string),
    })
    .subscribe((val) => res.json(val));
};

export const getProductById = (req: Request, res: Response) => {
  const productId = req.params.id;
  productService.getById(productId).subscribe((val) => {
    if (!val) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json(val);
    }
  });
};

export const createProduct = (req: Request, res: Response) => {
  const newProduct: ProductRequestDTO = req.body;
  productService
    .createOne(newProduct)
    .subscribe((val: any) => res.status(200).send(val));
};

export const updateProductById = (req: Request, res: Response) => {
  const productId = req.params.id;
  const product: ProductRequestDTO = req.body;
  if (req.body._id) {
    return res
      .status(400)
      .json({ message: "Including _id in the request body is not allowed" });
  }
  productService.updateOne(productId, product).subscribe((result) => {
    if (!result.acknowledged) {
      res
        .status(500)
        .json({ message: "The DB culden't confirm the modification" });
    } else {
      if (result.matchedCount === 0) {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(200).send(result.modifiedCount.toString());
      }
    }
  });
};

export const deleteProductById = (req: Request, res: Response) => {
  const productId = req.params.id;
  productService.deleteOne(productId).subscribe((result) => {
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
