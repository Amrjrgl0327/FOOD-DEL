"use client";
import { useState } from "react";
import CategorySidebar from "./_features/category-sidebar";
import DishGrid from "./_features/dish-grid";

export default function DishesPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-100 min-h-screen">
      <CategorySidebar
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <DishGrid selectedCategory={selectedCategory} />
    </div>
  );
}
