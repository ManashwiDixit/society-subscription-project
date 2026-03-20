import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function AdminLayout({children}) {
    return(
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">


            <Sidebar/>

            <div className="flex-1 flex flex-col">
                <Navbar/>

                {/* page content */}
                <main className="p-6">
                    {children}
                </main>

            </div>

        </div>
    )
}