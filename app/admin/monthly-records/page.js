"use client";

import {useState} from "react";
export default function MonthlyRecordsPage(){

const [selectedMonth,setSelectedMonth] = useState("January");

const [records,setRecords] = useState([
{
id:1,
flat:"A101",
month: "January",
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
}
]);

//button logic for paid

const markPaid =(id)=>{

    const updatedRecords = records.map((record)=>
    (
        record.id === id ? {...record , status: "Paid"}
        : record
    )
    );
    setRecords(updatedRecords);
};

//filter records by month

const filteredRecords = selectedMonth
? records.filter((record)=>record.month.toLowerCase() === selectedMonth.toLowerCase())
: records;




return(
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">
            Monthly Records
        </h1>

        <div className="mb-4">

            <select
            value={selectedMonth}
            onChange={(e)=>setSelectedMonth(e.target.value)}
            className="border px-3 py-2 rounded">

               <option value="">All Months</option>
               <option>January</option>
               <option>February</option>
               <option>March</option>
               <option>April</option>
               <option>May</option>
               <option>June</option>

            </select>

        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b">
                        <th className="py-2"> Flat </th>
                         <th> Amount</th>
                          <th> Status </th>
                           <th> Action </th>
                    </tr>
                </thead>

                <tbody>
                    {filteredRecords.length === 0 ? (

                     <tr>
                     <td colSpan="4" className="text-center py-4 text-gray-500">
                            No records for this month
                     </td>
                     </tr>

                    ) : (
                    
                    
                    filteredRecords.map((record)=>(
                        <tr key={record.id} className="border-b hover:bg-gray-50">

                           <td className="py-2">{record.flat}</td>
                           <td>{record.amount}</td>
                           <td>
                            <span
                            className={`px-2 py-1 rounded text-sm ${ record.status === "Paid" ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"}`}
                            > 
                            {record.status}
                            </span>
                           </td>

                           <td>
                            {record.status === "Pending" && (
                                <button
                                onClick={()=>markPaid(record.id)}
                                className="text-blue-600 hover:text-blue-800">
                                    Mark Paid
                                </button>
                            )}
                           </td>





                        </tr>

                    ))
                )}
                </tbody>
            </table>
        </div>

    </div>

);

}