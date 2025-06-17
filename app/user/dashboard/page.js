'use client'
import UserDashHeader from "../../_component/UserDashHeader";
import * as React from "react";
import { FoodCard } from "../../_component/foodcard";
import { RestaurantList } from "../../_component/Userdash/RestaurantList";
import FoodCategories from "../../_component/Userdash/FoodCategory";
import { useToast } from "../../../hooks/use-toast";
import { Toaster } from "../../../components/ui/toaster";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { useEffect } from "react"

function Page() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [specialInstructions, setSpecialInstructions] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);

  const items = ["Pizza", "Burger", "Sushi", "Pasta", "Salad"];

  const handleSearch = (query) => {
    if (typeof query !== "string") return;
    setSearchQuery(query);
    const filtered = items.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleAddToCart = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const confirmAddToCart = () => {
    const itemWithExtras = {
      ...selectedItem,
      quantity,
      specialInstructions,
      addedAt: new Date().toISOString()
    };

    setCartItems((prevItems) => [...prevItems, itemWithExtras]);
    localStorage.setItem("cartItems", JSON.stringify([...cartItems, itemWithExtras]));
    
    toast({
      title: "Added to cart",
      description: `${selectedItem.name} has been added to your cart`,
      duration: 3000,
    });

    // Reset form
    setSpecialInstructions("");
    setQuantity(1);
    setIsDialogOpen(false);
  };

  const orderFood = async (food) => {
    console.log(food)
    const response = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: [food] }),
    });

    const result = await response.json();
    if (result.success) {
      alert("Order placed successfully!");
    } else {
      alert("Failed to place order.");
    }
  };
 

  return (
    <>
      <UserDashHeader onSearch={handleSearch} cartItems={cartItems} />
      <FoodCategories searchQuery={searchQuery} />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Best For Taste</h2>
              <FoodCard onAddToCart={handleAddToCart} onOrder={orderFood} />
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Popular Restaurants</h2>
              <RestaurantList />
            </section>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add to Cart</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Item
                </Label>
                <div className="col-span-3 font-medium">
                  {selectedItem.name}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-8 w-8 p-0"
                  >
                    -
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="instructions" className="text-right">
                  Special Instructions
                </Label>
                <Input
                  id="instructions"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any special requests?"
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmAddToCart} className="bg-orange-500 hover:bg-orange-600">
              Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </>
  );
}

export default Page;
