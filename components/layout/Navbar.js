"use client";
export default function Navbar(){
   const handleLogout = () => {
      localStorage.removeItem("token");

      window.location.href = "/";
   };
    return(
       <div className= "bg-white px-6 py-3 shadow-sm flex justify-between items-center" >

             <h2 className="text-lg font-semibold">
                Admin Dashboard
             </h2>
             <div className="flex items-center gap-4">
                

                 <span className="cursor-pointer">🔔</span>

                  <span className="font-medium">
                    Admin

                  </span>
                  <button
                  onClick={handleLogout}
                  className = "bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                     Logout
                  </button>

             </div>




       </div>







    );
}