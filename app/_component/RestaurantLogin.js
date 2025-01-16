"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPasswowrd] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleLogin = async()=>{
    if(!email|| !password){
      setError(true);
      return;
    }else{
      setError(false);
    }
    let result = await fetch("http://localhost:3000/api/restaurant",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password,login:true})
    }
    )
    console.log(result);
      const response = await result.json();
      if(response.success){
        alert("Successfully Logged In");
        const{result} = response;
        delete result.password;
        localStorage.setItem("RestaurantUser",JSON.stringify(response));
        router.push("/restaurant/dashboard");
      }
  }

  return (
   <>
    <div>
     <input type="email" placeholder="Enter Email Address" onChange ={(e)=>{setEmail(e.target.value)}}/>
     </div>
     {error && <span className="text-red-500">Please enter a valid email</span>}
     <div>
     <input type="password" placeholder="Enter Password" onChange={(e)=>{setPasswowrd(e.target.value)}}/>
   </div>
   {error && <span className="text-red-500">Please enter Password</span>}
   <button className="button-input" onClick={handleLogin}>Login</button>
   <br></br>
   </>
  )
}

export default Login