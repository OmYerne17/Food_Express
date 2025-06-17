"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../components/ui/carousel"
import { useEffect, useState } from "react"
import { Star, Clock, ShoppingCart } from "lucide-react"

export function FoodCard({ onAddToCart, onOrder }) {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      const response = await fetch('/api/restaurant/foods');
      const data = await response.json();
      setFoods(data.result);  
    };
    fetchFoods();
  }, []);

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full relative"
      >
        <CarouselContent className="py-4">
          {foods.map((food) => (
            <CarouselItem key={food._id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <div className="p-2">
                <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="p-3 pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-gray-800 truncate">
                        {food.resto_name}
                      </CardTitle>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-medium">4.5</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <div className="relative aspect-[4/3] w-full mb-3">
                      <img
                        src={food.image || "/api/placeholder/200/120"}
                        alt={food.name}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gray-600" />
                          <span className="text-xs font-medium text-gray-600">20-30 min</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-base text-gray-900 line-clamp-1">{food.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{food.description}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-orange-500">₹{food.price.toFixed(2)}</p>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">Delivery</span>
                          <span className="text-xs font-medium text-green-600">Free</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 pt-0">
                    <div className="flex gap-2 w-full">
                      <Button 
                        variant="outline" 
                        className="flex-1 h-9 text-sm font-medium hover:bg-orange-50 hover:text-orange-500 hover:border-orange-500 transition-colors"
                        onClick={() => onOrder(food)}
                      >
                        Order Now
                      </Button>
                      <Button 
                        className="flex-1 h-9 text-sm font-medium bg-orange-500 hover:bg-orange-600 transition-colors"
                        onClick={() => onAddToCart(food)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  )
}