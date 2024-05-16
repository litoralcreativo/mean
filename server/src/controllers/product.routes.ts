import express from "express";
import validatePagination from "../middlewares/pagination.middleware";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} from "./product.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 * definitions:
 *   Product:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         format: ObjectId
 *         description: Unique ID of the product
 *       nombre:
 *         type: string
 *         description: Name of the product
 *       descripcion:
 *         type: string
 *         description: Description of the product
 *       precio:
 *         type: number
 *         format: float
 *         description: Price of the product
 *       categoria_id:
 *         type: string
 *         format: ObjectId
 *         description: ID of the category the product belongs to
 */

/**
 * @swagger
 * /product:
 *   get:
 *     tags: [Products]
 *     description: Get all products
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: number
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", validatePagination, getAllProducts);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     tags: [Products]
 *     description: Get product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Product not found
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /product:
 *   post:
 *     tags: [Products]
 *     description: Create new product
 *     parameters:
 *       - in: body
 *         name: product
 *         description: Product to create
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *               description: Product name
 *             descripcion:
 *               type: string
 *               description: Product description
 *             price:
 *               type: number
 *               description: Product price
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Request error
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.post("/", createProduct);

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     tags: [Products]
 *     description: Update an existing product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *       - in: body
 *         name: product
 *         description: Product to be updated
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *               description: Product name
 *             descripcion:
 *               type: string
 *               description: Product description
 *             price:
 *               type: number
 *               description: Product price
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Request error
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateProductById);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     tags: [Products]
 *     description: Delete a product by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteProductById);

export { router };
