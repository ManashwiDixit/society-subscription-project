"use client";

import { useState } from "react";

export default function NotificationsPage() {

  const [message, setMessage] = useState("");
  const [lastMessage, setLastMessage] = useState("");

  const handleSend = () => {
    if (!message) {
      alert("Enter a message");
      return;
    }

    setLastMessage(message); // just store latest message
    setMessage(""); // clear input
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Notifications
      </h1>

      {/* Input */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">

        <textarea
          placeholder="Write notification..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border w-full p-2 rounded mb-4"
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send Notification
        </button>

      </div>

      {/* Output */}
      <div className="bg-white p-6 rounded-xl shadow-md">

        <h2 className="font-semibold mb-4">
          Last Notification
        </h2>

        {lastMessage ? (
          <p>{lastMessage}</p>
        ) : (
          <p className="text-gray-500">
            No notification sent yet
          </p>
        )}

      </div>

    </div>
  );
}