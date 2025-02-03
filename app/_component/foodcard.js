"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useEffect, useState } from "react"

export function FoodCard() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      const response = await fetch('/api/restaurant/foods');
      const data = await response.json();
      setFoods(data.result);  
      console.log(data.result)
    };
    fetchFoods();
  }, []);

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full h-[330px] relative"
      >
        <CarouselContent>
          {foods.map((food) => (
            <CarouselItem key={food._id} className=" sm:basis-1/8 md:basis-1/3 lg:basis-1/6">
              <div className="p-2">
                <Card className="w-[200px] h-[300px] flex flex-col">
                  <CardHeader className="p-2">
                    <CardTitle className="text-sm truncate">{food.resto_name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow p-2 flex flex-col space-y-2">
                    <div className="relative h-[120px] w-full">
                      <img
                        src={food.image || "/api/placeholder/200/120"}
                        alt={food.name}
                        className="absolute inset-0 w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <h3 className="font-bold text-sm line-clamp-1">{food.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">{food.description}</p>
                      <p className="text-sm font-semibold">₹{food.price.toFixed(2)}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-2 mt-auto">
                    <div className="flex gap-1 w-full">
                      <Button 
                        variant="outline" 
                        className="flex-1 h-8 text-xs"
                      >
                        Order
                      </Button>
                      <Button 
                        className="flex-1 h-8 text-xs"
                      >
                        Add Cart
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}