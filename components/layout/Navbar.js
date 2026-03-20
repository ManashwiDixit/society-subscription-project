export default function Navbar(){
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

             </div>




       </div>







    );
}