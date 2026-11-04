export default function DishCard({ food }) {
  return (
    <div className="border rounded-xl p-3 flex flex-col gap-2">
      <div className="relative">
        <img
          src={food.image || "/placeholder.png"}
          alt={food.name}
          className="w-full h-32 object-cover rounded-xl"
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-red-500 font-medium">{food.name}</span>
        <span className="text-sm">${food.price}</span>
      </div>
      <p className="text-xs text-gray-600">{food.ingredients}</p>
    </div>
  );
}
