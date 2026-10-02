"use client";
import { useState, useEffect } from "react";
import { server } from "@/app/_api/api";
import DishCard from "../_components/dish-card";

export default function DishGrid() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const getFoods = async () => {
      try {
        const res = await server.get("/food");
        console.log(res.data);
        setFoods(res.data.foods);
      } catch (err) {
        console.log(err);
      }
    };
    getFoods();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {foods.map((food) => (
        <DishCard key={food._id} food={food} />
      ))}
    </div>
  );
}
