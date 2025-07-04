"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Search, ShoppingCart, LogOut, Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"


function UserDashHeader({ onSearch }) {
  const [details, setDetails] = useState()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchCategory, setSearchCategory] = useState("all")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const [locations, SetLocations] = useState([])
  const [AvatarUrl, SetAvatar] = useState()
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState(null)

  const avatar = () => {
    const randomAvatarUrl = `https://api.dicebear.com/6.x/bottts/svg?seed=${Math.random().toString(5).substring(0)}`
    SetAvatar(randomAvatarUrl);
  }

  const loadlocations = async () => {
    try {
      // Use relative URL for API calls - this works for both local and deployed
      const response = await fetch('/api/user/locations');
      const result = await response.json();
      SetLocations(result.result)
    } catch (error) {
      console.error('Error loading locations:', error);
      SetLocations([]);
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem("User");
    router.push("/user/login");
  };

  useEffect(() => {
    const data = localStorage.getItem("User");
    if (!data) {
      router.push("/user/login");
    } else {
      try {
        const parsed = JSON.parse(data);
        setDetails(parsed);
        setEditData(parsed ? { ...parsed } : {});
        router.push("/user/dashboard");
        loadlocations();
        avatar();
      } catch (e) {
        localStorage.removeItem("User");
        router.push("/user/login");
      }
    }
  }, [router]);

  const handleSearch = (event) => {
    const query = event.target.value
    setSearchQuery(query)
    onSearch({ query, category: searchCategory })
  }

  const handleCategoryChange = (value) => {
    setSearchCategory(value)
    onSearch({ query: searchQuery, category: value })
  }

  const navigateToCart = () => {
    router.push("/user/cart");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto">
        {/* Top Bar */}
        <div className="px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between border-b">
          <div className="flex items-center">
            <Link href="/" className="text-lg sm:text-xl font-bold text-orange-500 hover:text-orange-600 transition-colors">
              FoodieExpress
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            <div className="hidden lg:flex items-center gap-3 sm:gap-4">
              {details ? (
                <div className="flex items-center gap-3 sm:gap-4">
                  <button 
                    onClick={navigateToCart}
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors relative"
                  >
                    <ShoppingCart className="h-5 w-5 text-gray-600" />
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      0
                    </span>
                  </button>
                  <Avatar className="h-8 w-8 border-2 border-orange-500">
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <span className="cursor-pointer">
                          <AvatarImage src={AvatarUrl} alt="User Avatar" />
                          <AvatarFallback>U</AvatarFallback>
                        </span>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>User Profile</DialogTitle>
                          <DialogDescription>
                            View and update your profile details below.
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
                              <Label htmlFor="mobile">Mobile</Label>
                              <Input
                                id="mobile"
                                value={editData.mobile || ""}
                                onChange={e => setEditData({ ...editData, mobile: e.target.value })}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="address">Address</Label>
                              <Input
                                id="address"
                                value={editData.address || ""}
                                onChange={e => setEditData({ ...editData, address: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="city">City</Label>
                              <Input
                                id="city"
                                value={editData.city || ""}
                                onChange={e => setEditData({ ...editData, city: e.target.value })}
                              />
                            </div>
                            <DialogFooter>
                              <Button type="submit">Update Profile</Button>
                            </DialogFooter>
                          </form>
                        )}
                      </DialogContent>
                    </Dialog>
                  </Avatar>
                  <button
                    onClick={handleSignOut}
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button 
                    onClick={() => router.push("/user/login")} 
                    variant="outline"
                    className="h-8 sm:h-9 px-3 sm:px-4 text-sm"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => router.push("/user/signup")}
                    className="h-8 sm:h-9 px-3 sm:px-4 text-sm bg-orange-500 hover:bg-orange-600"
                  >
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-3 sm:px-4 py-2.5 sm:py-3">
          <div className="flex flex-row items-center gap-2 max-w-5xl mx-auto">
          <div className="w-[100px] sm:w-[120px] md:w-[130px]">
            <Select 
              onValueChange={handleCategoryChange} 
              defaultValue="all"
              className=""
            >
              <SelectTrigger className="h-8 sm:h-9 text-sm">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Locations</SelectItem>
                {Array.isArray(locations) && locations.map((item, key) => (
                  <SelectItem key={key} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>
            <div className="flex flex-1 min-w-[150px] sm:min-w-[200px] md:min-w-[250px]">
              <Input
                type="search"
                placeholder="Search for food or restaurants"
                className="h-8 sm:h-9 rounded-r-none text-sm flex-1"
                value={searchQuery}
                onChange={handleSearch}
              />
              <Button 
                type="submit" 
                size="icon" 
                className="rounded-l-none h-8 sm:h-9 bg-orange-500 hover:bg-orange-600"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden px-3 sm:px-4 py-2.5 sm:py-3 border-t">
            <div className="flex flex-col gap-2">
              {details ? (
                <>
                  <button 
                    onClick={navigateToCart}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5 text-gray-600" />
                    <span className="text-sm">Cart</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <LogOut className="h-5 w-5 text-gray-600" />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => router.push("/user/login")} 
                    variant="outline"
                    className="w-full h-9 text-sm"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => router.push("/user/signup")}
                    className="w-full h-9 text-sm bg-orange-500 hover:bg-orange-600"
                  >
                    Sign up
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default UserDashHeader
