import { useRouter } from "next/navigation";
import { useState } from "react";

function RestaurantSignUp() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPasswowrd] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [Address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [mobile, setMobile] = useState('');
  const router = useRouter();
   const [passwordError, setPasswordError] = useState(false);
   const [error , setError] = useState(false);
  
  const handleSignUp = async() => {
    if(password !== confirmPassword){
      setPasswordError(true);
      return;
    }

    if(email === '' || password === '' || Address === '' || city === '' || mobile === ''){{
      setError(true);
      return;
    }}

    let result = await fetch("http://localhost:3000/api/restaurant" ,{
      method:"POST",
      headers: {
        "Content-Type": "application/json", // Include this header
      },
      body:JSON.stringify({name,email,password,confirmPassword,Address,city,mobile})
    })
     const response = await result.json();
    console.log(response);
    if(response.success){
      alert("Successfully Signed Up");
      const{result} = response;
      delete result.password;
      localStorage.setItem("RestaurantUser",JSON.stringify(response));
      router.push("/restaurant/dashboard");
    }
  }

  return (
    <>
    <div> 
     <input type="email" placeholder="Enter Email Address" onChange={(e) => setEmail(e.target.value)}/>
     </div>
     {error && <span className="text-red-500">Please enter a valid email</span>}
     <div>
     <input type="password" placeholder="Enter Password" onChange={(e) => setPasswowrd(e.target.value)}/>
   </div>
   {error && <span className="text-red-500">Please enter Password</span>}
     { passwordError && <span className="text-red-500">Please enter a valid password</span>}
     <div>
     <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
   </div>
      { passwordError && <span className="text-red-500">Please enter a valid password</span>}
      {error && <span className="text-red-500">Please enter Confirm Password</span>}
     <div>
     <input type="text" placeholder="Enter Restaurant Name" onChange={(e) => setName(e.target.value)}/>
   </div>
   {error && <span className="text-red-500">Please enter Restaurant Name</span>}
     <div>
     <input type="text" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)}/>
   </div>
   {error && <span className="text-red-500">Please enter Address</span>}
     <div>
     <input type="text" placeholder="Enter city"onChange={(e) => setCity(e.target.value)}/>
   </div>
   {error && <span className="text-red-500">Please enter city</span>}
     <div>
     <input type="tel" name="mobile" placeholder="Enter your mobile number" pattern="[0-9]{10}" required onChange={(e) => setMobile(e.target.value)} />
   </div>
     {error && <span className="text-red-500">Please enter mobile number</span>}
   <button className="button-input " onClick={handleSignUp}>SignUP</button>
   <br></br>
    </>
  )
}

export default RestaurantSignUp