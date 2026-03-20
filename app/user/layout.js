import UserNavbar from "@/components/layout/UserNavbar";

export default function UserLayout({ children }) {
  return (
    <div>

      <UserNavbar />

      <div className="p-6">
        {children}
      </div>

    </div>
  );
}