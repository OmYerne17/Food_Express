'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Search,ShoppingCart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function UserDashHeader({ onSearch }) {
  const randomAvatarUrl = `https://api.dicebear.com/6.x/bottts/svg?seed=${Math.random()
    .toString(5)
    .substring(0)}`;
   const [details,setDetails] = useState();
   const [searchQuery, setSearchQuery] = useState("");
   let router = useRouter();
   
   const navigateByimg = ()=>{
    router.push("/user/dashboard")
   }

 useEffect(() => {
   let data = localStorage.getItem("User");
  if(!data){
    // router.push("/") || 
    router.push("/user/login");
  } 
  else{
      setDetails(JSON.parse(data));
      // router.push("/user/dashboard")
  }
 } ,[])

 const handleSearch = (event) => {
   const query = event.target.value;
   setSearchQuery(query);
   onSearch(query);
 };

  return (
    <>
   <header className="border-b">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="text-2xl font-bold text-orange-500">
          FoodieExpress
        </Link>
        <div className="flex w-1/3 items-center">
          <Input type="search" placeholder="Search for food or restaurants" className="rounded-r-none " value={searchQuery} onChange={handleSearch} />
          <Button type="submit" size="icon" className="rounded-l-none">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        <div className="space-x-4">
          {details ? (
            <div className=" p-5">
            <ShoppingCart />
            </div>
          ) : (
            <>
              <Button onClick={() => (window.location.href = "/user/login")} variant="outline">Login</Button>
              <Button onClick={() => (window.location.href = "/user/signup")}>Sign up</Button>
            </>
          )}
        </div>
      </div>
    </header>
    </>
  );
}

export default UserDashHeader;
("");
