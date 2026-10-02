export default function DishCard({ food }) {
  return (
    <div className="rounded-xl border p-3">
      <img
        src={food.imgage || "/placeholder.png"}
        alt={food.name}
        className="w-full h-40 object-cover rounded-lg"
      />
      <div className="flex justify-between mt-2">
        <p className="font-medium">{food.name}</p>
        <p>${food.price}</p>
      </div>
      <p className="text-sm text-gray-500">{food.description}</p>
    </div>
  );
}
