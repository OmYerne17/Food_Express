"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../components/ui/carousel"
import { useEffect, useState } from "react"
import { Star, Clock, ShoppingCart } from "lucide-react"

export function FoodCard({ onAddToCart, onOrder, searchQuery = "" }) {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      const response = await fetch('/api/restaurant/foods');
      const data = await response.json();
      setFoods(data.result);  
    };
    fetchFoods();
  }, []);

  const filteredFoods = foods.filter((food) => {
    const query = searchQuery.toLowerCase();
    return (
      food.name.toLowerCase().includes(query) ||
      (food.resto_name && food.resto_name.toLowerCase().includes(query))
    );
  });

  // Split filteredFoods into pages of 10
  const pageSize = 10;
  const pages = [];
  for (let i = 0; i < filteredFoods.length; i += pageSize) {
    pages.push(filteredFoods.slice(i, i + pageSize));
  }

  // Section titles for each carousel page
  const sectionTitles = [
    "Try something new",
    "Deals for you",
    "Fastest near you",
    "National favourites",
    "Your past orders",
    "Top picks",
    "Best sellers",
    "Recommended for you",
    "Popular choices",
    "Chef's specials"
  ];

  return (
    <div className="w-full flex flex-col gap-10">
      {pages.length > 0 ? (
        pages.map((pageFoods, pageIndex) => (
          <div key={pageIndex} className="w-full">
            <h2 className="text-base font-semibold mb-1 ml-1 text-gray-800">
              {sectionTitles[pageIndex % sectionTitles.length]}
            </h2>
            <Carousel
              opts={{ align: "start" }}
              className="w-full relative"
            >
              <CarouselContent className="py-2">
                {pageFoods.map((food) => (
                  <CarouselItem
                    key={food._id}
                    className="basis-1/2 xs:basis-1/3 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 xl:basis-1/8"
                  >
                    <div className="p-1">
                      <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300 h-64 w-full max-w-xs mx-auto">
                        <CardHeader className="p-2 pb-1">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-xs font-semibold text-gray-800 truncate">
                              {food.resto_name}
                            </CardTitle>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                              <span className="text-[10px] font-medium">4.5</span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-2 pt-0">
                          <div className="relative aspect-[4/3] w-full mb-2 h-24">
                            <img
                              src={food.image || "/api/placeholder/200/120"}
                              alt={food.name}
                              className="absolute inset-0 w-full h-full object-cover rounded-md"
                            />
                            <div className="absolute top-1 right-1 bg-white/90 backdrop-blur-sm px-1 py-0.5 rounded-full">
                              <div className="flex items-center gap-0.5">
                                <Clock className="h-2.5 w-2.5 text-gray-600" />
                                <span className="text-[9px] font-medium text-gray-600">20-30 min</span>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-bold text-xs text-gray-900 line-clamp-1">{food.name}</h3>
                            <p className="text-[11px] text-gray-600 line-clamp-2">{food.description}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-base font-bold text-orange-500">₹{food.price.toFixed(2)}</p>
                              <div className="flex items-center gap-0.5">
                                <span className="text-[10px] text-gray-500">Delivery</span>
                                <span className="text-[10px] font-medium text-green-600">Free</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-2 pt-0">
                          <div className="flex gap-1 w-full">
                            <Button 
                              variant="outline" 
                              className="flex-1 h-7 text-xs font-medium hover:bg-orange-50 hover:text-orange-500 hover:border-orange-500 transition-colors px-1"
                              onClick={() => onOrder(food)}
                            >
                              Order
                            </Button>
                            <Button 
                              className="flex-1 h-7 text-xs font-medium bg-orange-500 hover:bg-orange-600 transition-colors px-1"
                              onClick={() => onAddToCart(food)}
                            >
                              <ShoppingCart className="h-3 w-3 mr-0.5" />
                              Add
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
        ))
      ) : (
        <div className="w-full text-center text-gray-500 py-8">No results found.</div>
      )}
    </div>
  )
}