import Image from "next/image"
import { Star } from "lucide-react"
import { restaurants } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"

export function RestaurantList() {

  return (
    <section className="py-8">
      <h2 className="mb-6 text-2xl font-bold">Top restaurants in your area</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} className="overflow-hidden">
            <img
              src={restaurant.image || "/placeholder.svg"}
              alt={restaurant.name}
              width={300}
              height={200}
              className="h-48 w-full object-cover"
            />
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">{restaurant.name}</h3>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{restaurant.rating}</span>
                <span className="mx-2">•</span>
                <span>{restaurant.deliveryTime}</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">{restaurant.cuisines.join(", ")}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}