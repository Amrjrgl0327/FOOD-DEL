import { CategorySidebar } from "./_features/category-sidebar";

export default function Page() {
  return (
    <div className="flex">
      <CategorySidebar />
      <div className="flex-1 p-4">
        <h1 className="font-bold text-xl">Dishes</h1>
      </div>
    </div>
  );
}
