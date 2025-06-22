import { useEffect, useState } from "react"
import { Card, CardContent } from "../../../components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../../components/ui/carousel"
import { Star } from "lucide-react"

export function RestaurantList({ searchQuery = "" }) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Simulate fetching data (replace with real API if available)
    import("../../../lib/data").then(mod => setRestaurants(mod.restaurants));
  }, []);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const query = searchQuery.toLowerCase();
    return (
      restaurant.name.toLowerCase().includes(query) ||
      restaurant.cuisines.some((cuisine) => cuisine.toLowerCase().includes(query))
    );
  });

  // Pagination logic: 10 per page
  const pageSize = 10;
  const pages = [];
  for (let i = 0; i < filteredRestaurants.length; i += pageSize) {
    pages.push(filteredRestaurants.slice(i, i + pageSize));
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
        pages.map((pageRestaurants, pageIndex) => (
          <div key={pageIndex} className="w-full">
            <h2 className="text-base font-semibold mb-1 ml-1 text-gray-800">
              {sectionTitles[pageIndex % sectionTitles.length]}
            </h2>
            <Carousel opts={{ align: "start" }} className="w-full relative">
              <CarouselContent className="py-2">
                {pageRestaurants.map((restaurant) => (
                  <CarouselItem
                    key={restaurant.id}
                    className="basis-1/2 xs:basis-1/3 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 xl:basis-1/8"
                  >
                    <div className="p-1">
                      <Card className="overflow-hidden">
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
  );
}