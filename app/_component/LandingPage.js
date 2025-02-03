import UserHeader from "./UserHeader";
import NavCards from "./NavCards";
import DynamicCard from "./DynamicCard";
import ShopGroceries from "./ShopGroceries";
import LandFooter from "./LandFooter";
import UserDashHeader from "./UserDashHeader";

const data = [
  {
    id: 1,
    title: "Everything you crave, delivered.",
    subtitle: "Your favorite local restaurants",
    description:
      "Get a slice of pizza or the whole pie delivered, or pick up house lo mein from the Chinese takeout spot you've been meaning to try.",
    buttonText: "Find Restaurant",
    imgSrc:
      "https://img.cdn4dd.com/cdn-cgi/image/fit=cover,format=auto,quality=60/https://cdn.doordash.com/managed/consumer/seo/home/landing_cta/download_the_app_desktop.png",
    bgcolor: "transparent",
    padding: " 0px",
    margin: "-30px",
    index: 3,
  },
  {
    id: 2,
    title: "Satisfy your cravings, anywhere.",
    subtitle: "Food from all cuisines",
    description:
      "Whether it's sushi, tacos, or a healthy salad, get your favorites delivered to your doorstep.",
    buttonText: "Order Now",
    imgSrc:
      "https://img.cdn4dd.com/cdn-cgi/image/fit=cover,format=auto,quality=60/https://cdn.doordash.com/managed/consumer/seo/home/landing_cta/dashpass_desktop.png",
    bgcolor: "rgba(255, 241 , 238)", // Milky pink
    padding:"70px",
    margin: "",
    index: 0
  },
];

const data2 =[{
  id: 1,
  title: "Convenience stores at your doorstep",
  subtitle: "",
  description:
"  Stock up on snacks, household essentials, candy, or vitamins — all delivered in under an hour.",
   buttonText: "Shop Now",
  imgSrc:
    "https://img.cdn4dd.com/cdn-cgi/image/fit=cover,format=auto,quality=60/https://cdn.doordash.com/managed/consumer/seo/home/landing_cta/convenience_desktop.png",
  bgcolor: "rgba(255, 241 , 238)", // Milky pink
  padding:"70px"

}]

const footer =[ {
  Tags: [
    "Alcohol Australia",
    "Alcohol Delivery Australia",
    "Back To School Delivery",
    "Beauty Stores",
    "Beauty Supply",
    "Catering Near Me",
    "Chips Big Ahoy Cookie",
    "Convience Store",
  ],
},
{
  Tags: [
    "Dashmart Near Me",
    "Deck The Doorstep",
    "Diageo Holiday",
    "Drugstores Canada",
    "Flower Delivery",
    "Grocery Delivery Canada",
    "Haleon Well Within Reach",
    "Halloween,",
  ],
},
{
  Tags: [
    "Holiday Hosting",
    "Hsa Bank",
    "Hsa Fsa Store",
    "Large Group Orders",
    "Medicine Delivery",
    "Mothers Day",
    "Pet Store Near Me",
    "Play For An Ultra",
  ],
},
{
  Tags: [
    "Retail Stores Near Me",
    "Seasonal Holidays",
    "Snap Ebt",
    "Valentines Day",
    "Winter Holidays",
  ],
},]
export default function LandingPage() {

  return (
    <>
      <div className="">
        <div className="relative h-[650px]">
          <img
            src="https://wallpaperaccess.com/full/825322.jpg"
            alt="Landing Page Image"
            className="w-full h-full object-cover"
          />
          <div className=" absolute top-0 z-10 w-full  ">
            <UserDashHeader />
            </div>
          
          <div className="absolute inset-0 bg-zinc-700 bg-opacity-30 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Food Delivery
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Order your favorite food from the best restaurants
            </p>
            <div className="space-x-4">
              <button
                onClick={() => (window.location.href = "/restaurant")}
                className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100"
              >
                Restaurant Login
              </button>
              <button
                className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-black"
                onClick={() => (window.location.href = "/user")}
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className=" flex justify-center items-center">
          <NavCards />
        </div>
       <div>
        <DynamicCard data ={data}/>
       </div>
       <div>
        <ShopGroceries/>
       </div>
       <div>
        <DynamicCard  data = {data2}/>
       </div>
       <div className="bg-black">
       <LandFooter data ={footer}/>
       <br></br>
       <LandFooter data={footer}/>
       </div>
      </div>
        
    </>
  );
}
