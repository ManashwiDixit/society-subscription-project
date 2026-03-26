"use client" ;
import { useState, useEffect } from "react";

import RecentPaymentsTable from "@/components/tables/RecentPatmentsTable";



export default function Home(){

  const [data, setData] = useState(null);

    useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
       // console.log("DASHBOARD DATA:", data);
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);
  //validation
    if (!data) return <p>Loading...</p>;

  return(
    <div>
    

      <div className="p-10 flex gap-6">
        <div className="bg-white p-4 shadow rounded bg-white shadow-md rounded-xl p-6 w-64 flex items-center justify-between hover:shadow-xl transition">
             <p className="text-black-500  font-bold">Total Flats</p>
             <h2 className="text-2xl font-bold text-gray-800">{data.totalFlats}</h2>
        </div>

        <div className="bg-white p-4 shadow rounded bg-white shadow-md rounded-xl p-6 w-64 flex items-center justify-between hover:shadow-xl transition">
          <p className="text-black-500 font-bold">Pending Payments</p>
          <h2 className="text-2xl  text-red-800">{data.pendingPayments}</h2>
        </div>

        <div className="bg-white p-4 shadow rounded bg-white shadow-md rounded-xl p-6 w-64 flex items-center justify-between hover:shadow-xl transition">
          <p className="text-black-500 font-bold">Total Revenue</p>
          <h2 className=" text-2xl text-blue-800">₹{data.totalRevenue}</h2>
        </div>
      </div>

     
       <RecentPaymentsTable payments={data.recentPayments} />

     </div>

    
  );
}