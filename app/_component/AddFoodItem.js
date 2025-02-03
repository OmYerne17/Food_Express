import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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

    const response = await fetch("http://localhost:3000/api/restaurant/foods", {
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
      className="flex flex-col justify-center items-center"
      style={{
        backgroundImage: "url('https://via.placeholder.com/1920x1080')", // Test with a placeholder image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
      }}
    >
      <h1 className="text-xl font-bold">Add Food Item</h1>
      <input
        type="text"
        placeholder="Food Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Food Item Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Food Item Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Food Item Image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <div>
        <button onClick={handleAddFoodItem} className="button-input">
          ADD Item
        </button>
      </div>
    </div>
  );
};

export default AddFoodItem;
