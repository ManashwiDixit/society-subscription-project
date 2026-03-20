"use client";

import { useState,useEffect } from "react";

export default function EditSubscriptionModal({
isOpen,
onClose,
plan,
onSave
}){

const [amount,setAmount] = useState("");

useEffect(()=>{

if(plan){
setAmount(plan.amount);
}

},[plan]);

if(!isOpen) return null;

return(

<div className="fixed inset-0 bg-black/30 flex items-center justify-center">

<div className="bg-white p-6 rounded-xl w-[350px]">

<h2 className="text-lg font-semibold mb-4">
Edit Subscription
</h2>

<p className="mb-2">{plan.type}</p>

<input
type="number"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
className="border w-full p-2 rounded mb-4"
/>

<div className="flex justify-end gap-2">

<button
onClick={onClose}
className="border px-3 py-1 rounded"
>
Cancel
</button>

<button
onClick={()=>{

onSave({
...plan,
amount:Number(amount)
});

onClose();

}}
className="bg-blue-600 text-white px-3 py-1 rounded"
>
Save
</button>

</div>

</div>

</div>

);

}