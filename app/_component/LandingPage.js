import UserHeader from "./UserHeader";
import NavCards from "./NavCards";
import DynamicCard from "./DynamicCard";
import ShopGroceries from "./ShopGroceries";
import LandFooter from "./LandFooter";
import LandingHeader from "./Userdash/LandingHeader";

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
      <div className="w-full">
        <div className="relative h-[400px] md:h-[500px] lg:h-[650px]">
          <img
            src="https://wallpaperaccess.com/full/825322.jpg"
            alt="Landing Page Image"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 right-0 z-20">
            <LandingHeader />
          </div>
          
          <div className="absolute inset-0 bg-zinc-700 bg-opacity-30 flex flex-col justify-center items-center text-white px-4 pt-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 text-center">
              Food Delivery
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-4 md:mb-8 text-center max-w-2xl">
              Order your favorite food from the best restaurants
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center items-center">
              <button
                onClick={() => (window.location.href = "/restaurant")}
                className="w-full sm:w-auto bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
              >
                Restaurant Login
              </button>
              <button
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
                onClick={() => (window.location.href = "/user/dashboard")}
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex justify-center items-center py-8">
          <NavCards />
        </div>
        <div className="py-8">
          <DynamicCard data={data}/>
        </div>
        <div className="py-8">
          <ShopGroceries/>
        </div>
        <div className="py-8">
          <DynamicCard data={data2}/>
        </div>
        <div className="bg-black">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12">
            <LandFooter data={footer}/>
            <br />
            <LandFooter data={footer}/>
          </div>
        </div>
      </div>
    </>
  );
}
