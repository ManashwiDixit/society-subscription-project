"use client";

import { useState , useEffect } from "react";


export default function UserProfile(){

 

     const [form, setForm] = useState({
      name: "",
      email: "",
      phone: "",
     });
     const [showPassword, setShowPassword] = useState(false);
     const [newPassword, setNewPassword] = useState("");
     const [confirmPassword , setConfirmPassword] = useState("");
     const [currentPassword, setCurrentPassword] = useState("");


    const handleSave = async ()=>{
           try {
           const token = localStorage.getItem("token");

           const res = await fetch("http://localhost:5000/api/users/profile", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                 Authorization: `Bearer ${token}`,
                },
               body: JSON.stringify({
               phone: form.phone,
            }),
      });

    const data = await res.json();

    console.log("UPDATED:", data);

    alert("Profile updated ✅");

  } catch (err) {
    console.log(err);
  }

    };

    const handlePasswordUpdate = async () => {
  if (!currentPassword || !newPassword || !confirmPassword) {
    alert("Fill all fields");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match ");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/users/change-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    alert("Password updated ");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPassword(false);

  } catch (err) {
    console.log(err);
  }
};

    useEffect(() => {
     const token = localStorage.getItem("token");

     fetch("http://localhost:5000/api/users/profile", {
      headers: {
      Authorization: `Bearer ${token}`,
      },
     })
    .then((res) => res.json())
    .then((data) => {
      console.log("PROFILE:", data);

      setForm({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
      });
    })
    .catch((err) => console.log(err));
}, []);

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
                value={form.name}
                disabled
                className="border w-full p-2 rounded bg-gray-100"
                />

                </div>
                <div>
                    <label className="text-sm text-gray-500">Email</label>
                       <input
                
                       type= "email"
                       value={form.email}
                       disabled
                       className="border w-full p-2 rounded bg-gray-100"
                      />
                </div>

                 <div>
                    <label className="text-sm text-gray-500">Phone</label>
                     <input
                     type="text"
                     value={form.phone}
                     onChange={(e)=>setForm({...form, phone: e.target.value})}
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
        onClick={() =>  handlePasswordUpdate}
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