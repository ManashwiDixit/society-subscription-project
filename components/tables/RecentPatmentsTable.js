//dumy payment data
const payments = [
    {id:1, flat: "A101", owner:"rahul sharma", amount: "₹1500", status:"paid"},
    {id:2, flat: "B203", owner:"priya singh", amount: "₹1500", status:"pending"},
    {id:3, flat: "C302", owner:"amit verma", amount: "₹1500", status:"paid"},
    {id:4, flat: "D404", owner:"sneha gupta", amount: "₹1500", status:"pending"}

];

export default function RecentPaymentsTable(){
    return(
        <div className="bg-white p-6 rounded-xl shadow-md mt-8">
            <h2 className="text-lg font-semibold mb-4">
                Recent Payments
            </h2>

            <table className="w-full text-left border-collapse"> 
                <thead className="bg-gray-50 py-3" >
                    <tr className="border-b border">
                        <th className="py-3 px-4">Flat</th>
                        <th className="py-3 px-4" >Owner</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3">Status</th>

                    </tr>
                </thead>
                <tbody className="border">
                    {payments.map((payment)=>{
                        return (
                            <tr key={payment.id} className="border-b hover:bg-gray-59">
                            <td className="py-3 px-4">{payment.flat}</td>
                            <td className="py-3 px-4">{payment.owner}</td>
                            <td className="py-3 px-4">{payment.amount}</td>

                            <td>
                                <span className = { payment.status==="paid"?"text-green-600":"text-yellow-600"}>
                                 {payment.status}
                                </span>
                            </td>

                        </tr>
                     ) }
                        
                        )}
                </tbody>

            </table>

        </div>
    );
}