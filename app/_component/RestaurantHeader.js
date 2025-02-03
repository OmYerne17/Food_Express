'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function RestaurantHeader() {
   const [details,setDetails] = useState();
   let router = useRouter();
   
   const navigateByimg = ()=>{
    router.push("./")
   }

 useEffect(() => {
   let data = localStorage.getItem("RestaurantUser");
  if(!data){
    router.push("/") || router.push("/restaurant");
  } 
  else{
      setDetails(JSON.parse(data));
      router.push("/restaurant/dashboard")
  }
 } ,[])
  return (
    <>
    <div className=" flex justify-between h-[4.75rem] bg-white">
      <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.-80uB7Mvxvu8Vzfwhl3DhwHaHa%26pid%3DApi&f=1&ipt=e011b5194b45aaf1c40425f7ea86f74b4595ee5b95de4361e5efd1dd6f64e002&ipo=images"
        alt="Restaurant Logo"
        className="w-24"
        onClick={navigateByimg}

      />
      <ul className=" flex justify-evenly gap-3 p-5 w-[250px]"> 
        <li> <button onClick={()=>{(window.location.href = "/")}}>Home </button> </li>
         {
          details &&  details.result ? <li> <button onClick={() => { localStorage.removeItem("RestaurantUser"); router.push("/restaurant") }}>Logout</button> </li> :<li> Login </li>
           }
        {
          details && <li className="bg-zinc-600 rounded-full p-[12px] flex items-center justify-center text-white text-lg"> {details.result.email.charAt(0).toUpperCase()} </li>
        }{
          !details && <li><button onClick={() => { }}>SignUp</button></li>
        }{
        }

      </ul>
    </div>
      <div className="w-full h-[1px] bg-zinc-600"></div>
    </>
  );
}

export default RestaurantHeader;
("");
