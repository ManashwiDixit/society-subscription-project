"use client";

import { useRouter } from "next/navigation";

export default function AdminLogin(){
    const router = useRouter();

//temprorary login
const handleLogin = ()=>{
    router.push("/admin/dashboard");

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
          className="w-full border p-3 rounded mb-4"
          />

          {/* password input */}
          <input
          type="password"
          placeholder="Enter password"
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
