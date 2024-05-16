import express from "express";
import validatePagination from "../middlewares/pagination.middleware";
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
} from "./category.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management
 * definitions:
 *   Category:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         format: ObjectId
 *         description: Unique ID of the category
 *       nombre:
 *         type: string
 *         description: Name of the category
 *       descripcion:
 *         type: string
 *         description: Description of the category
 */

/**
 * @swagger
 * /category:
 *   get:
 *     tags: [Category]
 *     description: Get all categories
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
router.get("/", validatePagination, getAllCategories);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     tags: [Category]
 *     description: Get category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Category not found
 */
router.get("/:id", getCategoryById);

/**
 * @swagger
 * /category:
 *   post:
 *     tags: [Category]
 *     description: Create new category
 *     parameters:
 *       - in: body
 *         name: category
 *         description: Category to create
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *               description: Category name
 *             descripcion:
 *               type: string
 *               description: Category description
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Request error
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.post("/", createCategory);

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     tags: [Category]
 *     description: Update an existing category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *       - in: body
 *         name: category
 *         description: Category to be updated
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *               description: Category name
 *             descripcion:
 *               type: string
 *               description: Category description
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Request error
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateCategoryById);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     tags: [Category]
 *     description: Delete a category by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteCategoryById);

export { router };
