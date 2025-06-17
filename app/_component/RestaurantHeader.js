"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

function RestaurantHeader() {
  const randomAvatarUrl = `https://api.dicebear.com/6.x/bottts/svg?seed=${Math.random().toString(5).substring(0)}`;
  const [details, setDetails] = useState();
  let router = useRouter();

  const navigateByimg = () => {
    router.push("./");
  };

  useEffect(() => {
    let data = localStorage.getItem("RestaurantUser");
    if (!data) {
      router.push("/") || router.push("/restaurant");
    } else {
      setDetails(JSON.parse(data));
      router.push("/restaurant/dashboard");
    }
  }, []);
  return (
    <>
      <header className="border-b w-full">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-4 gap-4 md:gap-0 px-2">
          <Link href="/" className="text-2xl font-bold text-orange-500 flex-shrink-0">
            FoodieExpress
          </Link>
          <div className="flex w-full md:w-1/3 items-center gap-2">
            <Input
              type="search"
              placeholder="Search for food or restaurants"
              className="rounded-r-none bg-white text-black flex-1 min-w-0"
            />
            <Button
              type="submit"
              size="icon"
              className="rounded-l-none bg-[#BF8404] hover:bg-[#9e6c00]"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
          <div className="space-x-4 flex items-center">
            {details ? (
              <div className="p-0 md:p-5">
                <ul className="flex gap-4 md:gap-7 items-center">
                  <li className="mt-[-10px]">
                    <Avatar>
                      <AvatarImage src={randomAvatarUrl} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        localStorage.removeItem("RestaurantUser");
                        router.push("/restaurant");
                      }}
                    >
                      <LogOut />
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Button
                  onClick={() => (window.location.href = "/restaurant")}
                  variant="outline"
                >
                  Login
                </Button>
                <Button onClick={() => (window.location.href = "restaurant/signup")}>Sign up</Button>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default RestaurantHeader;
("");
