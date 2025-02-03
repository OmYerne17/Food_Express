'use client'
import UserDashHeader from "@/app/_component/UserDashHeader";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FoodCard } from "@/app/_component/foodcard";
import { RestaurantList } from "@/app/_component/Userdash/RestaurantList";
import FoodCategories from "@/app/_component/Userdash/FoodCategory";

function Page() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState([]);

  const items = ["Pizza", "Burger", "Sushi", "Pasta", "Salad"];

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = items.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <>
      <UserDashHeader onSearch={handleSearch} />
      <FoodCategories searchQuery={searchQuery} />
      <div className="flex justify-center items-start">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Our Menu</h1>

          <div>
            <h2 className="text-xl font-bold">Best For Taste</h2>
            <FoodCard />
          </div>
          <div className="text-xl font-bold">
            <RestaurantList />
          </div>

          <div className="mt-4">
            {filteredItems.length > 0 ? (
              <ul>
                {filteredItems.map((item, index) => (
                  <li key={index} className="py-2">{item}</li>
                ))}
              </ul>
            ) : (
              <p>No items found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
