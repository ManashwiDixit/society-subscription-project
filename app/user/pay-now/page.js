"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PayNowPage(){

  const router = useRouter();

  const [amount , setAmount] = useState("");
  const [ method, setMethod] = useState("");
  const [record, setRecord] = useState(null);
  const [success, setSuccess] = useState(false);
  const [month, setMonth] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/monthly-records/user", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(res => res.json())
    .then(data => {console.log("USER RECORD", data);
      setRecord(data);
      setMonth(data.month);
    });
  }, []);
 

  const handlePayment = async (e)=>{
      e.preventDefault
    if(!amount || !method){
      alert("Fill all fields");
      return;
    }
    const token = localStorage.getItem("token");

    try{
      const res = await fetch("http://localhost:5000/api/payments",
        {
          method: "POST",
          headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            amountPaid: Number(amount),
            mode: method,
            month: month,
          }),
        }
      );

      const data = await res.json();
      if(!res.ok) {
        alert(data.error || "payment failed");
        return;
      }
      alert("payment successful");
     
        setSuccess(true);
      console.log("PAYMENT:", data);
    

      

      

    }
    catch(err){
      console.log(err);
      alert("Payment failed")

    }
  };
  
if(success) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-600">
          Payment Successful 
        </h1>
        <p><strong>Flat:</strong>
        {record?.flat?.flatNumber}</p>
        <p><strong>Month:</strong>
        {record?.month}</p>
        <p><strong>Amount:</strong>
        {amount}</p>
        <p><strong>Mode:</strong>
        {method}</p>

        <button
        onClick={()=> router.push("/user/dashboard")}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Go to Dashboard
        </button>
      </div>
    </div>
  )
}

if(!record) return <p>Loading...</p>;
  

  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white p-8 rounded-xl shadow-md w-[400px]">

        <h1 className="text-xl font-bold mb-6 text-center">
          Pay Subscription
        </h1>

        <div className="space-y-3 mb-6">
          <p><strong>Flat:</strong> {record.flat}</p>
          <p><strong>Month:</strong> {record.month}</p>
          <p><strong>Total Amount:</strong> ₹{record.amount}</p>
           <p><strong>Paid:</strong> ₹{record.amountPaid}</p>
            <p><strong>Remaining:</strong> ₹{record.amount - record.amountPaid}</p>
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
            <input
            type="number"
            placeholder="Enter amount"
            value= {amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border w-full p-2 rounded mb-4"/>

        <button
          onClick={handlePayment}
          
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Pay Now
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