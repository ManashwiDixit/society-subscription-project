

export default function StatCard({title,value,icon}){
    return(
        <div className = "bg-white shadow-md rounded-xl p-6 w-64 flex items-center justify-between hover:shadow-xl transition">
          <div>
             <p className= "text-gray-500 text-sm">{title}</p>
             <h2 className= "text-2xl font-bold mt-1">{value}</h2>
          </div>

          <div className="text-3xl">
            {icon}
          </div>
           
           
        </div>
    );
}
