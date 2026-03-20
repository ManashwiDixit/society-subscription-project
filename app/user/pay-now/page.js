"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PayNowPage(){

  const router = useRouter();

  const [loading,setLoading] = useState(false);
  const [success,setSuccess] = useState(false);
  const [method,setMethod] = useState(""); 

  const amount = 1500;
  const flat = "A101";
  const month = "February";

  const handlePayment = ()=>{

    if(!method){
      alert("Please select a payment method");
      return;
    }

    setLoading(true);

    setTimeout(()=>{
      setLoading(false);
      setSuccess(true);
    },2000);
  };
       
  // success screen
  if(success){
    return(
      <div className="min-h-screen flex items-center justify-center bg-gray-50">

        <div className="bg-white p-8 rounded-xl shadow-md text-center">

          <h1 className="text-2xl font-bold mb-4 text-green-600">
            Payment Successful 🎉
          </h1>

          <p>Flat: {flat}</p>
          <p>Month: {month}</p>
          <p>Amount: ₹{amount}</p>
          <p>Mode: {method}</p> {/* ✅ show method */}

        </div>

      </div>
    )
  }

  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white p-8 rounded-xl shadow-md w-[400px]">

        <h1 className="text-xl font-bold mb-6 text-center">
          Pay Subscription
        </h1>

        <div className="space-y-3 mb-6">
          <p><strong>Flat:</strong> {flat}</p>
          <p><strong>Month:</strong> {month}</p>
          <p><strong>Amount:</strong> ₹{amount}</p>
        </div>

        {/* ✅ Payment Methods */}
         <div className="mb-6">

           <p className="font-semibold mb-2">Select Payment Method</p>

             <div className="flex gap-3">

              <button
                onClick={()=>setMethod("UPI")}
                className={`px-3 py-1 border rounded text-sm ${
                method === "UPI" ? "bg-blue-100 border-blue-500" : ""
                  }`}
                >
                 UPI
              </button>

              <button
                onClick={()=>setMethod("Card")}
                className={`px-3 py-1 border rounded text-sm ${
                method === "Card" ? "bg-blue-100 border-blue-500" : ""
                  }`}
               >
                  Card
               </button>

               <button
                 onClick={()=>setMethod("Netbanking")}
                 className={`px-3 py-1 border rounded text-sm ${
                 method === "Netbanking" ? "bg-blue-100 border-blue-500" : ""
                 }`}
               >
                Netbanking
               </button>

              </div>

            </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        <button
          onClick={()=>router.push("/user/subscriptions")}
          className="mt-3 text-sm text-gray-600"
        >
          Back to Subscriptions
        </button>

      </div>

    </div>
  );

}