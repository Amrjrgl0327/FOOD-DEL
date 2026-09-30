import { Category } from "../../models/categories.js";

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
export const deleteCategories = async (req, res) => {
  console.log("req", req.body);
  try {
    await Category.findByIdAndDelete(req.params.id);

    res.send("deleted");
  } catch (error) {
    res.send("failed");
  }
};

export const updateCategories = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true },
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update category", err });
  }
};
