"use client";

import { useState, useEffect } from "react";

export default function PaymentEntryPage(){

const [flat,setFlat] = useState("");
const [month,setMonth] = useState("");

const [mode,setMode] = useState("");
const [flats, setFlats] = useState([]);
const [amountPaid, setAmountPaid] = useState("");                                                                                                                                                                                                                                                                       

useEffect(() => {
  const token = localStorage.getItem("token");
  fetch("http://localhost:5000/api/flats",{
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then(res => res.json())
    .then(data => setFlats(data))
    .catch(err => console.log(err));
}, []);

const handleSubmit = async (e)=>{
e.preventDefault();

 console.log("FORM SUBMITTED 🚀"); 
 console.log("SENDING DATA:", {
  flat,
  month,
  amountPaid,
  mode,
});

if(!flat || !month || !amountPaid || !mode){
   alert("Please fill all fields");
return;
}
try{
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/payments", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        flat,
        month,
        amountPaid: Number(amountPaid),
  
        mode,
      }),
    });

    const data = await res.json();
    console.log("Payment Saved: ", data);

    alert("Payment recorded successfully ");
    window.location.href = "/admin/monthly-records";


    // reset form
setFlat("");
setMonth("");
setAmountPaid("");
setMode("");
console.log("API RESPONSE:", data);
} catch(err) {
  console.log(err);
  alert("Error saving payment ");
}



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
             { Array.isArray(flats) && flats.map((f)=>(
                <option key={f.id} value={f.flatNumber}>
                {f.flatNumber}
                </option>
             ))}
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
               <option>April</option>
               <option>May</option>
               <option>June</option>
               <option>July</option>
               <option>August</option>
               <option>September</option>
               <option>October</option>
               <option>November</option>
               <option>December</option>
          </select>

          {/* //for keeping track */}

             <input
             type="number"
             placeholder="Amount Paid"
             value={amountPaid}
             onChange={(e)=>setAmountPaid(e.target.value)}
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