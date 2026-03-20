import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100">

      {/* HERO */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-6 relative">

        {/* glow effect */}
        <div className="absolute w-[500px] h-[500px] bg-blue-300 opacity-20 rounded-full blur-3xl top-20"></div>

        <h1 className="text-5xl font-bold text-gray-800 leading-tight relative z-10">
          Society Subscription Manager
        </h1>

        <p className="text-gray-600 mt-5 text-lg max-w-2xl relative z-10">
          Manage society subscriptions, payments, and residents easily.
          Track monthly payments, generate reports, and keep everything organized.
        </p>

        {/* BUTTONS */}
        <div className="mt-10 flex gap-5 relative z-10">

          <Link href="/admin-login">
            <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-7 py-3 rounded-xl shadow-lg hover:scale-105 transition">
              Admin Login
            </button>
          </Link>

          <Link href="/login">
            <button className="bg-white text-gray-700 px-7 py-3 rounded-xl shadow-lg border hover:scale-105 transition">
              Resident Login
            </button>
          </Link>

        </div>

      </section>

      {/* STATS */}
      <section className="py-14 px-6">

        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl p-6 shadow-md text-center hover:scale-105 transition">
            <h2 className="text-3xl font-bold text-blue-500">120+</h2>
            <p className="text-gray-500 mt-1">Flats Managed</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md text-center hover:scale-105 transition">
            <h2 className="text-3xl font-bold text-purple-500">500+</h2>
            <p className="text-gray-500 mt-1">Residents</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md text-center hover:scale-105 transition">
            <h2 className="text-3xl font-bold text-indigo-500">₹5L+</h2>
            <p className="text-gray-500 mt-1">Payments Processed</p>
          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-400 text-sm">
        © 2026 Society Subscription Management System
      </footer>

    </div>
  );
}