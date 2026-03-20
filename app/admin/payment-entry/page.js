"use client";

import { useState } from "react";

export default function PaymentEntryPage(){

const [flat,setFlat] = useState("");
const [month,setMonth] = useState("");
const [amount,setAmount] = useState("");
const [mode,setMode] = useState("");

const handleSubmit = (e)=>{
e.preventDefault();

if(!flat || !month || !amount || !mode){
   alert("Please fill all fields");
return;
}

// simulate payment record
const payment = {
   flat,
   month,
   amount,
   mode,
   status:"Paid"
};

console.log("Payment Saved:",payment);

alert("Payment recorded successfully ✅");

// reset form
setFlat("");
setMonth("");
setAmount("");
setMode("");
};

return(

    <div className="p-6">

       <h1 className="text-2xl font-bold mb-6">
         Payment Entry
       </h1>

       <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-[400px] space-y-4"
       >

        {/* Flat */}
           <select
            value={flat}
            onChange={(e)=>setFlat(e.target.value)}
            className="border w-full p-2 rounded"
           >
             <option value="">Select Flat</option>
             <option>A101</option>
             <option>B203</option>
             <option>C302</option>
          </select>

{/* Month */}
          <select
            value={month}
            onChange={(e)=>setMonth(e.target.value)}
            className="border w-full p-2 rounded"
          >
             <option value="">Select Month</option>
             <option>January</option>
             <option>February</option>
             <option>March</option>
          </select>

{/* Amount */}
             <input
               type="number"
               placeholder="Enter Amount"
               value={amount}
               onChange={(e)=>setAmount(e.target.value)}
               className="border w-full p-2 rounded"
            />

{/* Mode */}
             <select
              value={mode}
              onChange={(e)=>setMode(e.target.value)}
              className="border w-full p-2 rounded"
             >
               <option value="">Payment Mode</option>
               <option>Cash</option>
               <option>UPI</option>
               </select>

                 <button
                   type="submit"
                   className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                    >
                     Save Payment
                 </button>

            </form>

          </div>

            );

           }