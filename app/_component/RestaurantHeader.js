"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";

function RestaurantHeader() {
  const randomAvatarUrl = `https://api.dicebear.com/6.x/bottts/svg?seed=${Math.random().toString(5).substring(0)}`;
  const [details, setDetails] = useState();
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  let router = useRouter();

  const navigateByimg = () => {
    router.push("./");
  };

  useEffect(() => {
    let data = localStorage.getItem("RestaurantUser");
    if (!data) {
      router.push("/") || router.push("/restaurant");
    } else {
      const parsed = JSON.parse(data);
      setDetails(parsed);
      setEditData(parsed?.result ? { ...parsed.result } : {});
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
        
          <div className="space-x-4 flex items-center">
            {details ? (
              <div className="p-0 md:p-5">
                <ul className="flex gap-4 md:gap-7 items-center">
                  <li className="mt-[-10px]">
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <span className="cursor-pointer">
                          <Avatar>
                            <AvatarImage src={randomAvatarUrl} />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </span>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Restaurant Profile</DialogTitle>
                          <DialogDescription>
                            View and update your restaurant details below.
                          </DialogDescription>
                        </DialogHeader>
                        {editData && (
                          <form
                            className="space-y-4"
                            onSubmit={e => {
                              e.preventDefault();
                              // TODO: Implement update API call
                              alert("Profile updated! (implement API call)");
                              setOpen(false);
                            }}
                          >
                            <div>
                              <Label htmlFor="name">Name</Label>
                              <Input
                                id="name"
                                value={editData.name || ""}
                                onChange={e => setEditData({ ...editData, name: e.target.value })}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                value={editData.email || ""}
                                readOnly
                                className="bg-gray-100 cursor-not-allowed"
                              />
                            </div>
                            <div>
                              <Label htmlFor="Address">Address</Label>
                              <Input
                                id="Address"
                                value={editData.Address || ""}
                                onChange={e => setEditData({ ...editData, Address: e.target.value })}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="city">City</Label>
                              <Input
                                id="city"
                                value={editData.city || ""}
                                onChange={e => setEditData({ ...editData, city: e.target.value })}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="mobile">Mobile</Label>
                              <Input
                                id="mobile"
                                value={editData.mobile || ""}
                                onChange={e => setEditData({ ...editData, mobile: e.target.value })}
                                required
                              />
                            </div>
                            <DialogFooter>
                              <Button type="submit">Update Profile</Button>
                            </DialogFooter>
                          </form>
                        )}
                      </DialogContent>
                    </Dialog>
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
