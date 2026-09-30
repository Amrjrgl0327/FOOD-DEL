"use client";
import { useEffect, useState } from "react";
import { server } from "../../../_api/api";

export function CategorySidebar() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const load = async () => {
    const res = await server.get("/categories");
    setCategories(res.data.categories);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    if (!name.trim()) return;
    await server.post("/categories", { name });
    setName("");
    load();
  };

  const rename = async (id) => {
    const newName = prompt("new name");
    if (!newName) return;
    await server.put(`/categories/${id}`, { name: newName });
    load();
  };

  const remove = async (id) => {
    await server.delete(`/categories/${id}`);
    load();
  };

  return (
    <div className="w-64 p-4 border-r">
      <h2 className="font-bold mb-3">Categories</h2>
      {categories.map((c) => (
        <div key={c._id} className="flex justify-between py-1">
          <span>{c.name}</span>
          <span className="flex gap-2">
            <button onClick={() => rename(c._id)}>✏️</button>
            <button onClick={() => remove(c._id)}>🗑️</button>
          </span>
        </div>
      ))}
      <input
        className="border w-full mt-3 p-1"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New Category"
      />
      <button className="mt-2 w-full border p-1" onClick={add}>
        Add
      </button>
    </div>
  );
}
