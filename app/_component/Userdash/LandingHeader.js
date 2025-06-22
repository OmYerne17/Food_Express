import React from 'react'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { cn } from "../../../lib/utils";

function LandingHeader() {
    const randomAvatarUrl = `https://api.dicebear.com/6.x/bottts/svg?seed=${Math.random()
        .toString(5)
        .substring(0)}`;
    const [details, setDetails] = useState();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    let router = useRouter();
  
    const navigateByimg = () => {
      router.push("./");
    };
  
    useEffect(() => {
      let data = localStorage.getItem("User");
      if (!data) {
        router.push("/");
      }else{
        const parsed = JSON.parse(data);
      setDetails(parsed)
      }
    }, []);

    return (
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="text-xl md:text-2xl font-bold text-orange-500">
              FoodieExpress
            </Link>
            
            {details ? (
              <div className="flex items-center gap-4">
                <ul className="flex items-center gap-4">
                  <li>
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
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <div className="hidden md:flex gap-2">
                  <Button
                    onClick={() => (window.location.href = "/user/login")}
                    variant="outline"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => (window.location.href = "/user/signup")}
                  >
                    Sign up
                  </Button>
                </div>
                <button 
                  className="md:hidden p-2"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          {!details && isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col gap-2">
                <Input
                  type="search"
                  placeholder="Search for food or restaurants"
                  className="w-full bg-white text-black"
                />
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => (window.location.href = "/user/login")}
                    variant="outline"
                    className="w-full"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => (window.location.href = "/user/signup")}
                    className="w-full"
                  >
                    Sign up
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    );
}

export default LandingHeader;
