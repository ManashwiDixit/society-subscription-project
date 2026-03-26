

export default function RecentPaymentsTable({payments}){
   
    if (!payments || payments.length === 0) {
      return <p>No recent payments</p>;
    }


    return(
        <div className="bg-white p-6 rounded-xl shadow-md mt-8">
            <h2 className="text-lg font-semibold mb-4">
                Recent Payments
            </h2>

            <table className="w-full text-left border-collapse"> 
                <thead className="bg-gray-50 py-3" >
                    <tr className="border-b border">
                        <th className="py-3 px-4">Flat</th>
                        
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Mode</th>
                        <th className="py-3">Status</th>

                    </tr>
                </thead>
                <tbody className="border">
                    {payments.map((p, index)=>{
                        return (
                            <tr key={p.id} className="border-b hover:bg-gray-59">
                            <td className="py-3 px-4">{p.flat}</td>
                            
                            <td className="py-3 px-4">{p.amount}</td>
                            <td className="py-3 px-4">{p.mode}</td>
                            <td className="py-3 px-4 ">
                                <span className=" bg-green-400 py-2 px-4">  {p.status}</span>
                             
                            </td>

                        </tr>
                     ) }
                        
                        )}
                </tbody>

            </table>

        </div>
    );
}