// dummy data
"use client";
import {useState} from "react";
import {Pencil, Trash2 } from "lucide-react";


export default function FlatsTable({flats, onDelete, onEdit}) {

    if (flats.length === 0) {
    return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      No flats found.
    </div>
    );
    }
 
    return(
        <div className="bg-white p-6 rounded-xl shadow-md">
            <table className="w-full text-left">


        <thead>
          <tr className="border-b">
            <th className="py-2 ">Flat</th>
            <th>Type</th>
            <th>Owner</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {flats.map((flat) => (
            <tr key={flat.id} className="border-b">

              <td className="py-2">{flat.flat}</td>
              <td>{flat.type}</td>
              <td>{flat.owner}</td>
              <td>{flat.email}</td>
              <td>{flat.phone}</td>
              <td>
              <span
               className={`px-2 py-1 rounded text-sm ${
               flat.status === "Occupied"
               ? "bg-green-50 text-green-700"
               : "bg-yellow-50 text-yellow-700"
               }`}
               >
               {flat.status}
             </span>
             </td>

             <td>
             < div className="flex gap-3 items-center">
             <button onClick={()=>onEdit(flat)}
             className="text-blue-600 hover:text-blue-800 rounded-lg ">
                  <Pencil size={22} />
              </button>

              <button
               onClick={() => {
               const confirmDelete = confirm("Delete this flat?");
               if (confirmDelete) {
               onDelete(flat.id);
               }

               }}
              className="text-red-600 hover:text-red-800 rounded-lg">
                <Trash2 size={22} />
               </button>
               </div>
               </td>

            </tr>
          ))}
        </tbody>


            </table>

        </div>
    );
}