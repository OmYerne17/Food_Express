"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner";

export const FoodItem = () => {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [foodItem, setFoodItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setIsLoading(true);
      const restaurantData = JSON.parse(localStorage.getItem("RestaurantUser"));
      if (!restaurantData?.result?._id) {
        throw new Error("Restaurant data not found");
      }

      const response = await fetch(`/api/restaurant/foods/${restaurantData.result._id}`);
      const data = await response.json();

      if (data.success) {
        setFoodItem(data.result);
      } else {
        throw new Error(data.error || "Failed to load food items");
      }
    } catch (error) {
      console.error("Error loading food items:", error);
      toast.error(error.message || "Failed to load food items");
      setFoodItem([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/restaurant/foods/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success("Food Item Deleted Successfully");
        loadItems();
      } else {
        throw new Error(data.error || "Failed to delete food item");
      }
    } catch (error) {
      console.error("Error deleting food item:", error);
      toast.error(error.message || "Failed to delete food item");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`/api/restaurant/foods/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, price, description, image }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success("Food Item Updated Successfully");
        loadItems();
      } else {
        throw new Error(data.error || "Failed to update food item");
      }
    } catch (error) {
      console.error("Error updating food item:", error);
      toast.error(error.message || "Failed to update food item");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-2xl font-bold mb-6 text-orange-600">Food Items</h1>

      {foodItem.length === 0 ? (
        <p className="text-gray-500">No food items found</p>
      ) : (
        <>
          {/* Table for desktop, cards for mobile */}
          <div className="hidden md:block w-full overflow-x-auto rounded-lg shadow">
            <table className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-orange-100 text-orange-700">
                <tr>
                  <th className="p-3 text-left font-semibold">S.N</th>
                  <th className="p-3 text-left font-semibold">Name</th>
                  <th className="p-3 text-left font-semibold">Price</th>
                  <th className="p-3 text-left font-semibold">Description</th>
                  <th className="p-3 text-left font-semibold">Image</th>
                  <th className="p-3 text-left font-semibold">Operation</th>
                </tr>
              </thead>
              <tbody>
                {foodItem.map((item, key) => (
                  <tr key={item._id} className="border-b hover:bg-orange-50 transition-colors">
                    <td className="p-3">{key + 1}</td>
                    <td className="p-3 font-medium">{item.name}</td>
                    <td className="p-3">₹{item.price}</td>
                    <td className="p-3 text-gray-600">{item.description}</td>
                    <td className="p-3">
                      <img className="w-20 h-20 object-cover rounded shadow" src={item.image} alt={item.name} />
                    </td>
                    <td className="p-3">
                      <Button 
                        variant="outline"
                        onClick={() => handleDelete(item._id)} 
                        className="border-2 rounded-md mr-2"
                      >
                        Delete
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Edit</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit Food Item</DialogTitle>
                            <DialogDescription>
                              Make changes to your food item here. Click save when you're done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Name
                              </Label>
                              <Input 
                                id="name" 
                                className="col-span-3" 
                                defaultValue={item.name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="price" className="text-right">
                                Price
                              </Label>
                              <Input 
                                id="price" 
                                className="col-span-3" 
                                defaultValue={item.price}
                                onChange={(e) => setPrice(e.target.value)}
                              />
                            </div> 
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="description" className="text-right">
                                Description
                              </Label>
                              <Input 
                                id="description" 
                                className="col-span-3" 
                                defaultValue={item.description}
                                onChange={(e) => setDescription(e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="image" className="text-right">
                                Image URL
                              </Label>
                              <Input 
                                id="image" 
                                className="col-span-3" 
                                defaultValue={item.image}
                                onChange={(e) => setImage(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={() => handleUpdate(item._id)}>Save changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for mobile */}
          <div className="md:hidden w-full space-y-6">
            {foodItem.map((item, key) => (
              <div key={item._id} className="bg-white rounded-xl shadow p-4 flex flex-col gap-3 border border-gray-200">
                <div className="flex items-center gap-4">
                  <img className="w-20 h-20 object-cover rounded shadow" src={item.image} alt={item.name} />
                  <div className="flex-1">
                    <div className="font-bold text-lg text-orange-600">{item.name}</div>
                    <div className="text-gray-600 text-sm mb-1">{item.description}</div>
                    <div className="font-semibold text-gray-800">₹{item.price}</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button 
                    variant="outline"
                    onClick={() => handleDelete(item._id)} 
                    className="border-2 rounded-md"
                  >
                    Delete
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Edit</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Food Item</DialogTitle>
                        <DialogDescription>
                          Make changes to your food item here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input 
                            id="name" 
                            className="col-span-3" 
                            defaultValue={item.name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="price" className="text-right">
                            Price
                          </Label>
                          <Input 
                            id="price" 
                            className="col-span-3" 
                            defaultValue={item.price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div> 
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">
                            Description
                          </Label>
                          <Input 
                            id="description" 
                            className="col-span-3" 
                            defaultValue={item.description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="image" className="text-right">
                            Image URL
                          </Label>
                          <Input 
                            id="image" 
                            className="col-span-3" 
                            defaultValue={item.image}
                            onChange={(e) => setImage(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={() => handleUpdate(item._id)}>Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

