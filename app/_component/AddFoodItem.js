import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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

const AddFoodItem = ({ setRender, render }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  const handleAddFoodItem = async () => {
    console.log(name, price, description, image);
    let resto_id;
    let resto_name;
    const restaurantData = await JSON.parse(localStorage.getItem("RestaurantUser"));
    console.log(restaurantData, "Restaurant Data");

    if (restaurantData) {
      resto_id = restaurantData.result._id;
      resto_name = restaurantData.result.name;
      
    }
    console.log(resto_id, "Resto ID");

    const response = await fetch("/api/restaurant/foods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, image, description, resto_id, resto_name }),
    });

    const result = await response.json();
    if (result.success) {
      alert("Food Item Added Successfully");
      setName("");
      setPrice("");
      setDescription("");
      setImage("");
      setRender(!render);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center">
      <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Add Food Item</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Food Item</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input id="name" className="col-span-3"  onChange ={(e)=>{setName(e.target.value)}}/>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                          Price
                        </Label>
                        <Input id="price" className="col-span-3"  onChange ={(e)=>{setPrice(e.target.value)}}/>
                      </div> 
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <Input id="description" className="col-span-3"  onChange ={(e)=>{setDescription(e.target.value)}}/>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                          Image
                        </Label>
                        <Input id="image" className="col-span-3"  onChange ={(e)=>{setImage(e.target.value)}}/>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => handleAddFoodItem()}>Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
    </div>
  );
};

export default AddFoodItem;
