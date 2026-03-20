"use client";

import Link from "next/link";

export default function UserNavbar() {
  return (
    <div className="bg-white shadow-md px-6 py-3 flex justify-between items-center">

      <h1 className="font-bold text-lg">Society App</h1>

      <div className="flex gap-6">

        <Link href="/user/dashboard">Dashboard</Link>
        <Link href="/user/subscriptions">Subscriptions</Link>
        <Link href="/user/profile">Profile</Link>

        <button className="text-red-500">
          Logout
        </button>

      </div>

    </div>
  );
}