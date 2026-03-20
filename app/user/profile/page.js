"use client";

import { useState } from "react";


export default function UserProfile(){

 

     const [phone ,setPhone] = useState("9876543210");
     const [showPassword, setShowPassword] = useState(false);
     const [newPassword, setNewPassword] = useState("");
     const [confirmPassword , setConfirmPassword] = useState("");
     const [currentPassword, setCurrentPassword] = useState("");


    const handleSave = ()=>{
        alert("Profile updated ✅");

    };

   

    return(
    
    
    <div className="p-6">

        <h1 className="text-2xl font-bold mb-6">
            My Profile
        </h1>

        <div className="grid grid-cols-2 gap-6">
            <div>

                <h2 className="font-semibold text-lg">
                    Profile Details
                </h2>
               
                <div>
                     
                <label className="text-sm text-gray-500">Name</label>
                <input
                type="text"
                value="Rahul Sharma"
                disabled
                className="border w-full p-2 rounded bg-gray-100"
                />

                </div>
                <div>
                    <label className="text-sm text-gray-500">Email</label>
                       <input
                
                       type="email"
                       value="rahul@email.com"
                       disabled
                       className="border w-full p-2 rounded bg-gray-100"
                      />
                </div>

                 <div>
                    <label className="text-sm text-gray-500">Phone</label>
                     <input
                     type="text"
                     value={phone}
                     onChange={(e)=>setPhone(e.target.value)}
                     className="border w-full p-2 rounded"
                     />

                 </div>

               

                <button
                   onClick={handleSave}
                   className="bg-blue-600 text-white px-4 py-2 rounded">

                    Save Changes
                </button>

            </div>
             {/* Change Password Button */}
<div className="mt-6">

  <button
    onClick={() => setShowPassword(!showPassword)}
    className="text-blue-600 font-medium"
  >
    {showPassword ? "Cancel" : "Change Password"}
  </button>

  {/* Hidden section */}
  {showPassword && (
    <div className="mt-4 space-y-3">

      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e)=>setCurrentPassword(e.target.value)}
        className="border w-full p-2 rounded"
      />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e)=>setNewPassword(e.target.value)}
        className="border w-full p-2 rounded"
      />

      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
        className="border w-full p-2 rounded"
      />

      <button
        onClick={() => {

          if(!currentPassword || !newPassword || !confirmPassword){
            alert("Fill all fields");
            return;
          }

          if(newPassword !== confirmPassword){
            alert("Passwords do not match ❌");
            return;
          }

          alert("Password updated 🔒");

          // reset
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setShowPassword(false);

        }}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update Password
      </button>

    </div>
  )}

</div>

        </div>


    </div>
    
);

}