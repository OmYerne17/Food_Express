"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { FiMail, FiLock, FiCoffee } from "react-icons/fi";
import Image from "next/image";

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
    let result = await fetch("/api/restaurant",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password,login:true})
    })
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
    <div className="min-h-[70vh] relative flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md px-4">
        <Card className="backdrop-blur-lg bg-white/80 shadow-2xl rounded-2xl overflow-hidden">
          {/* Decorative top bar */}
          <div className="h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>
          
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-block p-3 rounded-full bg-orange-100 mb-4">
                <FiCoffee className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Restaurant Login
              </h2>
              <p className="text-gray-600">
                Welcome back! Please sign in to continue
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                  </div>
                  <Input
                    type="email"
                    placeholder="Enter Email Address"
                    onChange={(e) => { setEmail(e.target.value) }}
                    className="pl-10 w-full border-gray-200 focus:border-orange-500 focus:ring-orange-500 transition-colors"
                  />
                </div>
                {error && <span className="text-red-500 text-sm block mt-1">Please enter a valid email</span>}
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                  </div>
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) => { setPasswowrd(e.target.value) }}
                    className="pl-10 w-full border-gray-200 focus:border-orange-500 focus:ring-orange-500 transition-colors"
                  />
                </div>
                {error && <span className="text-red-500 text-sm block mt-1">Please enter Password</span>}
              </div>

              <Button 
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:scale-[0.98]"
              >
                Sign In
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default Login