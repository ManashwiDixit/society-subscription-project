import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-indigo-200  to-blue-700  p-6">

      {/* Title */}
      <h1 className="text-xl font-bold mb-8">
        Society Admin
      </h1>

      {/* Menu */}
      <ul className="space-y-2">

        <li>
          <Link
            href="/admin/dashboard"
            className="block px-4 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            href="/admin/flats"
            className="block px-4 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Flats
          </Link>
        </li>

        <li>
          <Link
            href="/admin/subscriptions"
            className="block px-4 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Subscriptions
          </Link>
        </li>

        <li>
          <Link
            href="/admin/monthly-records"
            className="block px-4 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Monthly Records
          </Link>
        </li>

        <li>
          <Link
            href="/admin/payment-entry"
            className="block px-4 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Payment Entry
          </Link>
        </li>

        <li>
          <Link
            href="/admin/reports"
            className="block px-4 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Reports
          </Link>
        </li>

        <li>
          <Link
            href="/admin/notifications"
            className="block px-4 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Notifications
          </Link>
        </li>

        <li>
          <Link
            href="/admin/profile"
            className="block px-4 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Profile
          </Link>
        </li>

      </ul>

    </div>
  );
}