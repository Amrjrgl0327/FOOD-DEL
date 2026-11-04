"use client";
import { useEffect, useState } from "react";
import { server } from "@/app/_api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const emptyForm = {
  name: "",
  price: "",
  ingredients: "",
  image: "",
  category: "",
};

export default function DishFormDialog({
  defaultCategoryId,
  title,
  onCreated,
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    server
      .get("/food-category")
      .then((res) => setCategories(res.data.categories || res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleOpenChange = (isOpen) => {
    if (isOpen) {
      setForm({ ...emptyForm, category: defaultCategoryId || "" });
      setErrors({});
    }
    setOpen(isOpen);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Food name is required";
    const price = Number(form.price);
    if (!form.price || isNaN(price) || price <= 0)
      e.price = "Price must be a number above 0";
    if (!form.category) e.category = "Choose a category";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await server.post("/food", {
        ...form,
        name: form.name.trim(),
        price: Number(form.price),
      });
      setOpen(false);
      onCreated();
    } catch (err) {
      console.log(err);
      setErrors({ server: "Could not save the dish" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="border-2 border-dashed border-red-400 rounded-xl min-h-64 flex flex-col items-center justify-center gap-3 hover:bg-red-50">
          <span className="w-10 h-10 rounded-full bg-red-500 text-white text-2xl flex items-center justify-center">
            +
          </span>
          <span className="text-sm text-center">
            Add new Dish to <br /> {title}
          </span>
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Dish to {title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="name">Food name</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Type food name"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="price">Food price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="Enter price..."
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-md h-9 px-2"
            >
              <option value="">Choose a category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          <div>
            <Label htmlFor="ingredients">Ingredients</Label>
            <Textarea
              id="ingredients"
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
              placeholder="List ingredients..."
            />
          </div>

          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          {errors.server && (
            <p className="text-sm text-red-500">{errors.server}</p>
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Dish</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
