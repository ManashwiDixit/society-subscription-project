"use client";

import { useParams } from "next/navigation"; 

export default function SubscriptionDetail(){

    const params = useParams();
    const month = params.month;

    //temporary data
const record = {
    month,
    amount:1500,
    status:"Partial",
    mode:"UPI",
    date:"2 april 2026",
  };

  return(
      <div className="p-6">

        <h1 className="text-2xl font-bold mb-6">
            {month} Subscription
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <p><strong>Month:</strong>{record.month}</p>
            <p><strong>Amount:</strong> ₹{record.amount}</p>

            <p>
                <strong> Status: </strong>{" "}
                <span className= {`px-2 py-1 rounded text-sm ${
                    record.status === "Paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"


                }`}>
                    {record.status}
                </span>

            </p>

              <p><strong>Payment Mode:</strong> {record.mode}</p>
               <p><strong>Payment Date:</strong> {record.date}</p>

        </div>



      </div>
  );


}