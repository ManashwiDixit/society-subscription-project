"use client";
import {useState, useEffect} from "react";


export default function AddFlatModal({isOpen,onClose, onAddFlat ,editFlat}){

     const [flat, setFlat] = useState(editFlat?.flat ||"");
     const [owner, setOwner] = useState(editFlat?.owner || "");
     const [email, setEmail] = useState(editFlat?.email ||"");
     const [phone, setPhone] = useState( editFlat?.phone || "");
     const [type,  setType] = useState(editFlat?.type || "");
     const [status, setStatus] = useState(editFlat?.status || "");


    useEffect(() => {
    if (editFlat) {
    setFlat(editFlat.flat || "");
    setOwner(editFlat.owner || "");
    setEmail(editFlat.email || "");
    setPhone(editFlat.phone || "");
     }
    }, [editFlat]);

    if(!isOpen) return null;

    const handleSave=()=>{
        const newFlat = {
      id: editFlat?.id||Date.now(),
      flat:flat,
      type,
      owner,
      email,
      phone,
      status
    };

    onAddFlat(newFlat);

    setFlat("");
    setOwner("");
    setEmail("");
    setPhone("");

    onClose();
  };

    
    

    return(
     <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl w-[400px]">
          <h2 className="text-xl font-semibold mb-4">
            {flat?"Edit Flat":"Add Flat"}
          </h2>

          <input
           type="text"
           placeholder="Flat number"
           className="border w-full p-2 mb-3 rounded"
           value={flat}
           onChange={(e) => setFlat(e.target.value)}
          
          
          />
          <select
             value={type}
             onChange={(e)=>setType(e.target.value)}
             className="border w-full p-2 mb-3 rounded"
            >

            <option value="">Select Flat Type</option>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option> 
            <option value="3BHK">3BHK</option>

            </select>

        <input
          type="text"
          placeholder="Owner Name"
          className="border w-full p-2 mb-3 rounded"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />

        <div className="mb-4">
        <label className="block mb-1">Status</label>
        <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border rounded p-2"
        >
        <option value="Occupied">Occupied</option>
        <option value="Vacant">Vacant</option>
        </select>
        </div>

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-3 rounded"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone"
          className="border w-full p-2 mb-3 rounded"
          value={phone}
          onChange={(e)=>setPhone(e.target.value) }
        />

        <div className="flex justify-end gap-3 mt-4">

            <button onClick={onClose}
            className="px-4 py-2 border rounded"
            >
            Cancel
            </button>

            <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            >
            {flat ? "Update Flat" : "Save Flat"}
            </button>

        </div>

       </div>
     </div>
    );

}