"use client";

import { useState } from "react";

export default function AdminProfilePage() {

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "Admin User",
    email: "admin@email.com",
    phone: "9876543210",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
  });

  const handleSave = () => {
    alert("Profile updated ✅");
    setIsEditing(false);
  };

  const handlePassword = () => {
    if (!passwords.current || !passwords.new) {
      alert("Fill all fields");
      return;
    }

    alert("Password changed 🔒");

    setPasswords({ current: "", new: "" });
    setShowPassword(false);
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">Admin Profile</h1>

      {/* PROFILE CARD */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6 text-center">

        <div className="w-20 h-20 mx-auto bg-blue-500 text-white flex items-center justify-center rounded-full text-2xl font-bold">
          {form.name.charAt(0)}
        </div>

        {!isEditing ? (
          <>
            <h2 className="text-xl font-semibold mt-4">{form.name}</h2>
            <p className="text-gray-600">{form.email}</p>
            <p className="text-gray-600">{form.phone}</p>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <div className="mt-4 space-y-3">

            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border w-full p-2 rounded"
            />

            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border w-full p-2 rounded"
            />

            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="border w-full p-2 rounded"
            />

            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>

          </div>
        )}

      </div>

      {/* PASSWORD SECTION */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-md">

        <h2 className="text-lg font-semibold mb-4">Security</h2>

        {!showPassword ? (
          <button
            onClick={() => setShowPassword(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Change Password
          </button>
        ) : (
          <div className="space-y-3">

            <input
              type="password"
              placeholder="Current Password"
              value={passwords.current}
              onChange={(e) =>
                setPasswords({ ...passwords, current: e.target.value })
              }
              className="border w-full p-2 rounded"
            />

            <input
              type="password"
              placeholder="New Password"
              value={passwords.new}
              onChange={(e) =>
                setPasswords({ ...passwords, new: e.target.value })
              }
              className="border w-full p-2 rounded"
            />

            <div className="flex gap-3">

              <button
                onClick={handlePassword}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>

              <button
                onClick={() => {
                  setShowPassword(false);
                  setPasswords({ current: "", new: "" });
                }}
                className="bg-gray-200 px-4 py-2 rounded"
              >
                Cancel
              </button>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}