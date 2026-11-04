"use client";
import { useEffect, useState } from "react";
import { server } from "@/app/_api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CategorySidebar({ selected, onSelect }) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const res = await server.get("/categories");
      setCategories(res.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name is required");
      return;
    }
    try {
      await server.post("/categories", { name: name.trim() });
      setName("");
      setError("");
      setOpen(false);
      load();
    } catch (err) {
      console.log(err);
      setError("Could not add category");
    }
  };

  const rename = async (c) => {
    const newName = prompt("New name", c.name);
    if (!newName || !newName.trim()) return;
    await server.put(`/categories/${c._id}`, { name: newName.trim() });
    if (selected?._id === c._id) onSelect({ ...c, name: newName.trim() });
    load();
  };

  const remove = async (c) => {
    await server.delete(`/categories/${c._id}`);
    if (selected?._id === c._id) onSelect(null);
    load();
  };

  const chipClass = (active) =>
    "flex items-center gap-2 px-4 py-2 rounded-full border text-sm " +
    (active ? "border-red-500 text-red-500" : "border-gray-200");

  return (
    <section className="bg-white rounded-xl p-5 flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Dishes category</h2>

      <div className="flex flex-wrap items-center gap-3">
        <button className={chipClass(!selected)} onClick={() => onSelect(null)}>
          All Dishes
        </button>

        {categories.map((c) => {
          const active = selected?._id === c._id;
          return (
            <div key={c._id} className={chipClass(active)}>
              <button onClick={() => onSelect(c)}>{c.name}</button>
              {active && (
                <>
                  <button onClick={() => rename(c)} aria-label="Rename">
                    ✏️
                  </button>
                  <button onClick={() => remove(c)} aria-label="Delete">
                    🗑️
                  </button>
                </>
              )}
            </div>
          );
        })}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              className="w-9 h-9 rounded-full bg-red-500 text-white text-xl flex items-center justify-center"
              aria-label="Add category"
            >
              +
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new category</DialogTitle>
            </DialogHeader>
            <form onSubmit={add} className="flex flex-col gap-4">
              <div>
                <Label htmlFor="categoryName">Category name</Label>
                <Input
                  id="categoryName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Type category name..."
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
              <div className="flex justify-end">
                <Button type="submit">Add category</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
