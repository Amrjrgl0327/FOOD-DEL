import { Router } from "express";
import { requireToken } from "../../middleware/require-token.js";
import { requireAdmin } from "../../middleware/require-admin.js";
import {
  getFoods,
  createFood,
  updateFood,
  deleteFood,
} from "../../controller/food/food.js";

export const foodRouter = Router();

foodRouter
  .get("/", getFoods)
  .post("/", requireToken, requireAdmin, createFood)
  .put("/:id", requireToken, requireAdmin, updateFood)
  .delete("/:id", requireToken, requireAdmin, deleteFood);
