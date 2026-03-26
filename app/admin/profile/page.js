"use client";

import { useEffect, useState } from "react";

export default function AdminProfilePage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/users/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setForm({
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
      });
  }, []);

  const handleSave = () => {
    alert("Profile updated ✅");
    setIsEditing(false);
  };

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-8 flex justify-center">

      <div className="w-full max-w-3xl space-y-6">

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center gap-6">

          {/* Avatar */}
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center rounded-full text-2xl font-bold shadow">
            {user.name.charAt(0)}
          </div>

          {/* Info */}
          <div className="flex-1">

            {!isEditing ? (
              <>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
                <p className="text-gray-500">{user.phone}</p>

                <span className="inline-block mt-2 text-xs bg-gray-200 px-3 py-1 rounded-full">
                  {user.role}
                </span>
              </>
            ) : (
              <div className="space-y-2">
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                />
                <input
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                />
                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                />
              </div>
            )}
          </div>

          {/* Action */}
          <div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            )}
          </div>
        </div>

        {/* SECURITY CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center">

          <div>
            <h3 className="text-lg font-semibold">Security</h3>
            <p className="text-gray-500 text-sm">
              Update your password regularly
            </p>
          </div>

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
            Change Password
          </button>
        </div>

      </div>
    </div>
  );
}