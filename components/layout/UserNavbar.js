"use client";

import Link from "next/link";

export default function UserNavbar() {
    const handleLogout = () => {
      localStorage.removeItem("token");

      window.location.href = "/";
   };
   
  return (
    <div className="bg-white shadow-md px-6 py-3 flex justify-between items-center">

      <h1 className="font-bold text-lg">Society App</h1>

      <div className="flex gap-6">

        <Link className="px-4 py-2 rounded-lg hover:bg-blue-200" href="/user/dashboard">Dashboard</Link>
        <Link className="px-4 py-2 rounded-lg hover:bg-blue-200" href="/user/subscriptions">Subscriptions</Link>
        <Link className="px-4 py-2 rounded-lg hover:bg-blue-200" href="/user/profile">Profile</Link>

        <button 
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
          Logout
        </button>

      </div>

    </div>
  );
}