"use client";

import { useRouter } from "next/navigation";

export default function UserDashboard(){

    const currentMonth = "january";
    const amount = 1500;
    const status = "Pending";

    const router = useRouter();

    return(
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                Dashboard
            </h1>
            <div className="grid grid-cols-3 gap-4 mb-6">

            <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-500">Current Month</p>
                <h2 className="text-xl font-bold">{currentMonth}</h2>
            </div>

                {/* Amount */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-500">Amount</p>
                <h2 className="text-xl font-bold">₹{amount}</h2>
            </div>

             <div>
                  <p className="text-gray-500">Status</p>
                  <span className={`px-3 py-1 rounded text-sm ${
                    status === "Paid"
                     ? "bg-green-100 text-green-700"
                     : "bg-yellow-100 text-yellow-700"
                     }`}>
                    {status}
                   </span>

             </div>

          </div>

          {/* pay now button */}

          {status === "Pending" &&(

            <button
             onClick={() => router.push("/user/pay-now")}
             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Pay Now
            </button>
           
          )}
        


           


        </div>
    );
}