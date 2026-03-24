"use client";
import { useState, useEffect } from "react";
import EditSubscriptionModal from "@/components/modals/EditSubscriptionModal";

export default function SubscriptionsPage(){

    const [plans , setPlans] = useState([]);

         const [openModal,setOpenModal] = useState(false);
         const [selectedPlan,setSelectedPlan] = useState(null);

         useEffect(() => {
        fetch("http://localhost:5000/api/subscriptions")
        .then(res => res.json())
        .then(data => setPlans(data));
        }, []);

         const handleEditPlan = (plan)=>{
         setSelectedPlan(plan);
         setOpenModal(true);
         };

        const handleSavePlan = async  (updatedPlan)=>{

            const res = await fetch(`http://localhost:5000/api/subscriptions/${updatedPlan.id}`,
             {
               method: "PUT",
               headers: {
               "Content-Type": "application/json"
               },
               body: JSON.stringify({ amount: updatedPlan.amount })
             }
          );

        const data = await res.json();

        setPlans((prev) => prev.map((p)=>(p.id === data.id? data:p)));

        };


    return(
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                Subscription Plans
            </h1>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2">Flat Type</th>
                            <th>Monthly Amount</th>
                        
                            <th>Actions</th>

                        </tr>
                    </thead>

                    <tbody>
                        {plans.map((plan)=>(
                          <tr key={plan.id} className="border-b hover:bg-gray-50">
                          <td className="py-2">{plan.type}</td>
                          
                          <td>₹{plan.amount}</td>
                          <td>
                            <button 
                            onClick={()=>handleEditPlan(plan)}
                            
                            className="text-blue-600 hover:text-blue-800">
                                Edit
                            </button>
                          </td>
                          </tr>  

                        ))}
                    </tbody>
                </table>
            </div>




            <EditSubscriptionModal
             isOpen={openModal}
             onClose={()=>setOpenModal(false)}
             plan={selectedPlan}
             onSave={handleSavePlan}
            />

           </div>

    
    );
}

