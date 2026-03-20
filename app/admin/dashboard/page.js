import RecentPaymentsTable from "@/components/tables/RecentPatmentsTable";
import StatCard from "@/components/dashboard/StatCard";


export default function Home(){
  return(
    <div>
    

      <div className="p-10 flex gap-6">
        <StatCard title ="Total Flats" value="120" icon="🏢"/>
        <StatCard title ="Pending Payments" value="15" icon="⚠️"/>
        <StatCard title ="Total Revenue" value="50,000" icon="💰"/>

      </div>

     
      <RecentPaymentsTable/>

     </div>

    
  );
}