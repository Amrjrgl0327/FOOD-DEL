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
  description: "",
  image: "",
  category: "",
};

export default function DishFormDialog({ onCreated }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await server.get("/food-category");
        setCategories(res.data.categories || res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      setError("Name, price, category заавал хэрэгтэй");
      return;
    }
    try {
      await server.post("/food", { ...form, price: Number(form.price) });
      setForm(emptyForm);
      setError("");
      setOpen(false);
      onCreated();
    } catch (err) {
      console.log(err);
      setError("Хадгалж чадсангүй");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Add dish</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new dish</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
            />
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
              <option value="">Choose category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.categoryName || c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={form.image}
              onChange={handleChange}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
