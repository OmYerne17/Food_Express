"use client"
import RestaurantHeader from '@/app/_component/RestaurantHeader'
import React from 'react'
import { useState } from 'react';
import AddFoodItem from '@/app/_component/AddFoodItem';
import { FoodItem } from '@/app/_component/FoodItem';

const page = () => {
  const [render, setRender] = useState(false)
  const handleFoodItem = () => {
    setRender(!render);
  }
  return (

    <div>
        <RestaurantHeader/>
        <div className=' flex flex-col justify-center items-center'>
       <button onClick={() => handleFoodItem()} className='bg-zinc-900 rounded p-[7px] flex items-center justify-center text-white font-semibold border-2 border-black text-sm mt-5 mb-5'>{render ? "Dashboard" : "Add Food Item"}</button>
        </div>
        <div className='flex justify-center items-center'>
       {render ? 
       <AddFoodItem
       setRender={setRender}
       render={render}
       /> : 
       <FoodItem
       setRender={setRender}
       render={render}
       />}
     
     </div>
     </div>
  )
}

export default page