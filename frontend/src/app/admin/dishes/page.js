import { CategorySidebar } from "./_features/category-sidebar";
import DishGrid from "./_features/dish-grid";

export default function DishesPage() {
  return (
    <div className="flex">
      <CategorySidebar />
      <div className="flex-1 p-4">
        <h1 className="font-bold text-xl">Dishes</h1>
        <DishGrid />
      </div>
    </div>
  );
}
