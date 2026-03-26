"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function UserSubscriptions(){

  const [records , setRecords] = useState([]);

  useEffect(()=>{
    const token = localStorage.getItem("token");
      
     fetch("http://localhost:5000/api/monthly-records/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("USER RECORDS:", data);
        if (Array.isArray(data)){
          setRecords(data);
        }
        else if (data){
          setRecords([data]);
        }
          
          else
            {setRecords([]);}
        
      })
      .catch((err) => console.log(err));

  }, [])

  const router = useRouter();

  return(

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        My Subscriptions
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md">

        <table className="w-full text-left">

          <thead>
            <tr className="border-b">
              <th className="py-2">Month</th>
              <th>Amount</th>
              <th>Status</th>
              
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {records.map((record)=>(
              <tr key={record.id} className="border-b hover:bg-gray-50">

                <td className="py-2">{record.month}</td>

                <td>₹{record.amount}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      record.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {record.status}
                  </span>
                </td>

                

                <td>
                  {record.status === "Pending" ? (
                  <button
                  onClick={()=>router.push("/user/pay-now")}
                  className="text-blue-600 hover:text-blue-800">
                    Pay Now
                  </button>
                  ) : (
                    <button 
                    onClick={()=>router.push(`/user/subscriptions/${record.month}`)}
                    className="text-gray-600">
                      View Receipt
                    </button>
                  )}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}