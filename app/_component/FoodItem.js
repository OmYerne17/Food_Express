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

export const FoodItem = () => {
  useEffect(() => {
    loadItems();
  },[]);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [foodItem, setFoodItem] = useState();

  const loadItems = async () => {
    const restaurantData = JSON.parse(localStorage.getItem("RestaurantUser"));
    console.log(restaurantData);
    const resto_id = restaurantData.result._id;

    console.log(resto_id);
    let response = await fetch(
      "http://localhost:3000/api/restaurant/foods/" + resto_id
    );
    response = await response.json();
    console.log(response);

    if (response.success) {
      setFoodItem(response.result);
    }
  };

  const handleDelete = async (id) => {
    let response = await fetch("http://localhost:3000/api/restaurant/foods/" + id, {
      method: "DELETE",
    });
    response = await response.json();
    console.log(response);
    if(response.success){
      alert("Food Item Deleted Successfully");
      loadItems();
    }
  };
  const handleUpdate = async (id) => {
    try {
      console.log(id);
      let response = await fetch("http://localhost:3000/api/restaurant/foods/update/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name, price, description, image}),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(data);
      
      if(data.success){
        alert("Food Item Updated Successfully");
        loadItems();
      }
    } catch (error) {
      console.error("Error updating food item:", error);
      alert("Failed to update food item");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-6">Food Item</h1>

      <table>
        <thead className="font-bold">
          <tr>
            <td>S.N</td>
            <td>Name</td>
            <td>Price</td>
            <td>Description</td>
            <td>Image</td>
            <td>Operation</td>
          </tr>
        </thead>
        <tbody>
          {foodItem && foodItem.map((item, key) => (
            <tr key={key}>
              <td>{key+1}</td>
              <td>{item.name}</td>
              <td>{item.price+"Rs"}</td>
              <td>{item.description}</td>
              <td><img className="w-24 p-0" src={item.image} alt={item.name}/></td>
              <td>
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
  );
};

