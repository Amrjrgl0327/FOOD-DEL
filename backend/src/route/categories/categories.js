import { Router } from "express";
import { requireToken } from "../../middleware/require-token.js";
import { requireAdmin } from "../../middleware/require-admin.js";
import {
  getCategories,
  createCategories,
} from "../../controller/categories/categories.js";

export const categoriesRouter = Router();

categoriesRouter.get("/", getCategories);
categoriesRouter.post("/create", requireToken, requireAdmin, createCategories);
