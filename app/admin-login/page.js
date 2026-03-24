"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin(){
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

    const router = useRouter();

//temprorary login
const handleLogin = async  ()=>{

  if (!email || !password) {
  alert("Please fill all fields");
  return;
} 
   try{
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if(!res.ok) {
      alert(data.error)
      return;
    }
    if (data.user.role !== "admin") {
    alert("Not an admin account");
    return;
    }
    
     // SAVE TOKEN
    localStorage.setItem("token", data.token);

    alert("Login successful");

    
    router.push("/admin/dashboard");

   }
   catch(err){
    console.log(err);
    alert("Something went wrong")
   }

};

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* login card */}

      <div className="bg-white p-8 rounded-xl; shadow-md w-96">
         <h2 className="text-2xl font-bold text-center mb-6">
            Admin Login
         </h2>
        
       {/* email input  */}
        
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange = {(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded mb-4"
          />

          {/* password input */}
          <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          className=" w-full border p-3 rounded mb-6"/>

          {/* login button */}

          <button onClick={handleLogin}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
            Login
          </button>


      </div>
    </div>
);
}
