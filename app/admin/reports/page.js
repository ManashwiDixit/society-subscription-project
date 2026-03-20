"use client";

import { useState } from "react";

export default function ReportsPage(){
     
    const [records] = useState([
        {
            id:1,
            flat:"A101",
            month:"January",
            amount:1500,
            status:"Paid"
        },
           {
            id:2,
            flat:"B203",
            month:"January",
            amount:1500,
            status:"Pending"
        },

           {
            id:3,
            flat:"C302",
            month:"February",
            amount:1000,
            status:"Pending"
        },
    ]
    );

    //calculating totalcollection,totalflats and pendingamount
    const totalCollection =records.filter((record)=>record.status === "Paid")
    .reduce((sum,r)=>sum+r.amount,0);

    const pendingAmount = records.filter((record)=>record.status === "Pending")
    .reduce((sum,r)=>sum + r.amount , 0);

    const totalFlats = new Set(records.map((record)=>record.flat)).size

    const totalExpected = records.reduce((sum,r)=>sum + r.amount ,0);

    return(
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Reports
            </h1>

            {/* total amount expected */}

            <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-500">Total Expected Amount</p>
                <h2 className="text-2xl font-bold">₹{totalExpected}</h2>

            </div>

            {/* //total collection */}

            <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-500">Total Collection</p>
                <h2 className="text-2xl font-bold">₹{totalCollection}</h2>

            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-500">Pending Amount</p>
                <h2 className="text-2xl font-bold">₹{pendingAmount}</h2>

            </div>

             <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-500">Total Flats</p>
                <h2 className="text-2xl font-bold">{totalFlats}</h2>

            </div>


        </div>
    );

}