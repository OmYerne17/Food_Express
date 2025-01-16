import RestaurantHeader from "@/app/_component/RestaurantHeader";

export default function Home() {
  return (
    <>
      <div>
        <div className=" sticky top-0 ">
          <RestaurantHeader />
        </div>

        <div className="   h-[600px] w-full ">
          <img
            src="https://wallpaperaccess.com/full/825322.jpg"
            alt="Landing Page Image"
          />
        </div>
      </div>
    </>
  );
}
