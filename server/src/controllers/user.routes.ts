// routes/usersRoutes.ts
import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} from "./user.controller";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;
