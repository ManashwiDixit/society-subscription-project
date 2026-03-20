"use client";
import { useState } from "react";
import EditSubscriptionModal from "@/components/modals/EditSubscriptionModal";

export default function SubscriptionsPage(){

    const [plans , setPlans] = useState([
        {
        id:1,
        type:"1BHK",
        amount:1000

        },
        {
        id:2,
        type:"2BHK",
        amount:1500
        },
        {
        id:3,
        type:"3BHK",
        amount:1800

        }

    ]);

         const [openModal,setOpenModal] = useState(false);
         const [selectedPlan,setSelectedPlan] = useState(null);

         const handleEditPlan = (plan)=>{
         setSelectedPlan(plan);
         setOpenModal(true);
         };

        const handleSavePlan = (updatedPlan)=>{

        const updatedPlans = plans.map((p)=>
        p.id === updatedPlan.id ? updatedPlan : p
        );

        setPlans(updatedPlans);

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

