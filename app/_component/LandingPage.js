import UserHeader from "./UserHeader";

export default function LandingPage() {
  return (
    <>
      <div>
        <div className="relative h-[500px]">
          <img
            src="https://wallpaperaccess.com/full/825322.jpg"
            alt="Landing Page Image"
            className="w-full h-full object-cover"
            />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
            <UserHeader/>
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
              <button className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-black" onClick={() => (window.location.href = "/user")}>
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center items-center">
        <div className="" >
        
          </div>
        </div>
      </div>
    </>
  );
}
