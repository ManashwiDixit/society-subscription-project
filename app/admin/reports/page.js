"use client";

import { useState , useEffect } from "react";

export default function ReportsPage(){
     
    const [report, setReport] = useState(null);
    useEffect( () => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:5000/api/reports",{
             headers: {
               Authorization: `Bearer ${token}`,
            },
        }).then(res => res.json())
        .then(data => setReport(data))
        .catch(err => console.log(err));
    }, []);

     if (!report) return <p>Loading...</p>;


    return(
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Reports
            </h1>

            {/* total amount expected */}

            <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-500">Total Expected Amount</p>
                <h2 className="text-2xl font-bold">₹{report.totalExpected}</h2>

            </div>

            {/* //total collection */}

            <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-500">Total Collection</p>
                <h2 className="text-2xl font-bold">₹{report.totalCollection}</h2>

            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-500">Pending Amount</p>
                <h2 className="text-2xl font-bold">₹{report.pending}</h2>

            </div>

             <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-500">Total Flats</p>
                <h2 className="text-2xl font-bold">{report.totalFlats}</h2>

            </div>


        </div>
    );

}