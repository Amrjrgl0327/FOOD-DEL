import { Router } from "express";
import { requireToken } from "../../middleware/require-token.js";
import { requireAdmin } from "../../middleware/require-admin.js";
import {
  getCategories,
  createCategories,
  updateCategories,
  deleteCategories,
} from "../../controller/categories/categories.js";

export const categoriesRouter = Router();

categoriesRouter
  .get("/", getCategories)
  .post("/", createCategories, requireToken, requireAdmin, createCategories)
  .put("/", updateCategories, requireToken, requireAdmin, updateCategories)
  .delete("/", deleteCategories, requireToken, requireAdmin, deleteCategories);
