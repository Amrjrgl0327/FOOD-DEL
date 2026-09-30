import { Food } from "../../models/food.js";

export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().populate("category");
    res.status(200).json({ foods });
  } catch (error) {
    res.status(500).json({ message: "Failed to get foods", error });
  }
};

export const createFood = async (req, res) => {
  try {
    const { name, price, description, image, category } = req.body;
    const food = await Food.create({
      name,
      price,
      description,
      image,
      category,
    });
    res.status(200).json({ message: "Food created", food });
  } catch (error) {
    res.status(500).json({ message: "Failed to create food", error });
  }
};

export const updateFood = async (req, res) => {
  try {
    const updated = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update food", error });
  }
};

export const deleteFood = async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.send("deleted");
  } catch (error) {
    res.status(500).json({ message: "Failed to delete food", error });
  }
};
