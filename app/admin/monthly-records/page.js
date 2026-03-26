"use client";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

export default function MonthlyRecordsPage() {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [records, setRecords] = useState([]);
  const searchParams = useSearchParams();
  const refresh = searchParams.get("refresh") || "";

  //  fetch function 
  const fetchRecords = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/monthly-records", {
        cache: "no-store",
        headers: {
            "Cache-Control": "no-cache"
        },
      });

      const data = await res.json();
      console.log("FRESH DATA ", data);

      setRecords(data);
    } catch (err) {
      console.log(err);
    }
  };

  // load + auto refresh
  useEffect(() => {
    fetchRecords();

   
  }, [refresh]);

  // mark paid
  const markPaid = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5000/api/monthly-records/${id}/pay`,
        { method: "PUT",
            headers:{
                "Authorization": `Bearer ${token}`
            }
         }
      );

      const updated = await res.json();

      // update UI instantly
      setRecords((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r))
      );
    } catch (err) {
      console.log(err);
    }
  };

  //  filter by month
  const filteredRecords = selectedMonth
    ? records.filter(
        (r) =>
          (r.month || "").toLowerCase() === selectedMonth.toLowerCase()
      )
    : records;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Monthly Records</h1>
      
        <div className="mb-4 flex items-center gap-4">
            
              
 


      {/* Month Filter */}
      <div className="mb-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border px-3 py-2 rounded bg-blue-50 text-blue-700 font-medium"
        >
          <option value="">All Months</option>
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
      </div>
      {/* //generate monthly record */}

              <button
         onClick={async () => {
         const token = localStorage.getItem("token");

         await fetch("http://localhost:5000/api/monthly-records/generate", {
         method: "POST",
         headers: { "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
         body: JSON.stringify({ month: selectedMonth }),
         });

         fetchRecords(); // refresh
         }}
       className="bg-green-600 text-white px-4 py-2 rounded mb-4"
        >
         Generate Records
       </button>

        </div>
      

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Flat</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Remaining</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No records for this month
                </td>
              </tr>
            ) : (
              filteredRecords.map((record) => {
                const remaining = record.amount - record.amountPaid;

                let statusText = "Pending";
                let statusStyle = "text-red-700";

                if (record.amountPaid >= record.amount) {
                  statusText = "Paid";
                  statusStyle = "text-green-700";
                } else if (record.amountPaid > 0) {
                  statusText = "Partial";
                  statusStyle = "text-yellow-700";
                }

                return (
                  <tr key={record.id} className="border-b hover:bg-gray-50">
                    <td>{record.flat?.flatNumber || "N/A"}</td>
                    <td>{record.amount}</td>
                    <td>{record.amountPaid}</td>
                    <td>{remaining}</td>

                    <td>
                      <span
                        className={`px-2 py-1 rounded text-sm ${statusStyle}`}
                      >
                        {statusText}
                      </span>
                    </td>

                    <td>
                      {statusText !== "Paid" && (
                        <button
                          onClick={() => markPaid(record.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Mark Paid
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}