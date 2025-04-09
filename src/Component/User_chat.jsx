import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
} from "firebase/database";

const User_chat = ({ receiver }) => {
  const db = getDatabase();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const userData = useSelector((state) => state.user.user);

  // Unique Chat ID (combination of sender/receiver)
  const chatID =
    userData.uid > receiver.userid
      ? `${userData.uid + receiver.userid}`
      : `${receiver.userid + userData.uid}`;

  // Load messages in real-time
  useEffect(() => {
    const msgRef = ref(db, "messages/" + chatID);
    onValue(msgRef, (snapshot) => {
      let msgs = [];
      snapshot.forEach((msg) => {
        msgs.push(msg.val());
      });
      setMessages(msgs);
    });
  }, [chatID]);

  // Send message
  const handleSend = () => {
    const msgRef = ref(db, "messages/" + chatID);
    const newMsg = push(msgRef);
    set(newMsg, {
      senderId: userData.uid,
      receiverId: receiver.userid,
      message: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    setMessage("");
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 py-6 border-l dark:border-[#4c5050]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <img src={receiver.profileImage} className="w-12 h-12 rounded-full" alt="profile" />
        <div>
          <h4 className="text-lg font-bold dark:text-white">{receiver.name}</h4>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 mb-4 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[70%] px-4 py-2 rounded-lg text-white ${
              msg.senderId === userData.uid
                ? "ml-auto bg-royal_blue text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <p>{msg.message}</p>
            <p className="mt-1 text-xs text-right">
              {msg.time}
            </p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2">
        <input
          className="flex-1 px-4 py-2 border rounded-full dark:bg-black dark:text-white"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 text-white rounded-full bg-royal_blue"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default User_chat;
