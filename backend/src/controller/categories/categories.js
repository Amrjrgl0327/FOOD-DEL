//import { Category } from "../../models/categorySchema.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ message: "categories running", categories });
  } catch (error) {
    res.status(500).json({ message: "Failed to get categories", error });
  }
};

export const createCategories = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(200).json({ message: "Category created", category });
  } catch (error) {
    res.status(500).json({ message: "Failed to create category", error });
  }
};
