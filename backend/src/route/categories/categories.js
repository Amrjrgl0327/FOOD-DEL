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
  .post("/", requireToken, requireAdmin, createCategories)
  .put("/:id", requireToken, requireAdmin, updateCategories)
  .delete("/:id", requireToken, requireAdmin, deleteCategories);
