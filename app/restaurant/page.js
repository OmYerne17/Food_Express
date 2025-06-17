'use client'
import { useState } from "react";
import Login from "../_component/RestaurantLogin";
import SignUp from "../_component/RestaurantSignUp";
import RestaurantHeader from "../_component/RestaurantHeader";
import RestaurantFooter from "../_component/RestaurantFooter";

export default function Home() {
  const [login, setLogin] = useState(true);

  const handleToggle = () => {
    setLogin(!login);
  };

  return (
    <> 
    <div className=" min-h-screen flex flex-col w-full">

      <RestaurantHeader/>
    <div className=" flex-grow flex  flex-col justify-center items-center gap-3">
      <h1 className="font-bold text-[32px]">Restaurant Login/SignUp Page</h1>
      {login ? <Login /> : <SignUp />}
      <button className=" text-sky-300 mt-4 " onClick={handleToggle}>
        {login ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
      </button>
      </div>
         <RestaurantFooter/>
    </div>
    </>
  );
}
