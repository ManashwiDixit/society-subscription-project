"use client";
import { useState, useEffect } from "react";

export default function AddFlatModal({
  isOpen,
  onClose,
  onAddFlat,
  editFlat,
  onEditFlat
}) {

  //  STATE
  const [flatNumber, setFlatNumber] = useState("");
  const [type, setType] = useState("");
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("Occupied");

  //  EDIT MODE FILL
  useEffect(() => {
    if (editFlat) {
      setFlatNumber(editFlat.flatNumber || "");
      setType(editFlat.type || "");
      setOwner(editFlat.owner || "");
      setEmail(editFlat.email || "");
      setPhone(editFlat.phone || "");
      setStatus(editFlat.status || "Occupied");
    } else {
      // reset when opening fresh
      setFlatNumber("");
      setType("");
      setOwner("");
      setEmail("");
      setPhone("");
      setStatus("Occupied");
    }
  }, [editFlat, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {

    const newFlat = {
      flatNumber,
      type,
      owner,
      email,
      phone,
      status
    };

    console.log("SENDING DATA:", newFlat); // 🔥 debug

    // VALIDATION
    if (!flatNumber || !type || !owner || !email || !phone || !status) {
      alert("Please fill all fields");
      return;
    }

    if (editFlat) {
      onEditFlat({ ...newFlat, id: editFlat.id });
    } else {
      onAddFlat(newFlat);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[400px]">

        <h2 className="text-xl font-semibold mb-4">
          {editFlat ? "Edit Flat" : "Add Flat"}
        </h2>

        {/* Flat Number */}
        <input
          type="text"
          placeholder="Flat Number"
          className="border w-full p-2 mb-3 rounded"
          value={flatNumber}
          onChange={(e) => setFlatNumber(e.target.value)}
        />

        {/* Type */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
        >
          <option value="">Select Flat Type</option>
          <option value="1BHK">1BHK</option>
          <option value="2BHK">2BHK</option>
          <option value="3BHK">3BHK</option>
        </select>

        {/* Owner */}
        <input
          type="text"
          placeholder="Owner Name"
          className="border w-full p-2 mb-3 rounded"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
        >
          <option value="Occupied">Occupied</option>
          <option value="Vacant">Vacant</option>
        </select>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Phone */}
        <input
          type="text"
          placeholder="Phone"
          className="border w-full p-2 mb-3 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editFlat ? "Update Flat" : "Save Flat"}
          </button>
        </div>

      </div>
    </div>
  );
}