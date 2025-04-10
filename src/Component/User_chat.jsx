import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import EmojiPicker from "emoji-picker-react";
import { FaSmile, FaPaperPlane } from "react-icons/fa";

const User_chat = ({ receiver , onBack}) => {
  const db = getDatabase();
  const userData = useSelector((state) => state.user.user);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef(null);

  const chatID =
    userData.uid > receiver.userid
      ? `${userData.uid + receiver.userid}`
      : `${receiver.userid + userData.uid}`;

  useEffect(() => {
    const msgRef = ref(db, "messages/" + chatID);
    onValue(msgRef, (snapshot) => {
      const msgs = [];
      snapshot.forEach((msgSnap) => {
        const msg = msgSnap.val();

        if (msg.receiverId === userData.uid && msg.read === false) {
          set(ref(db, `messages/${chatID}/${msgSnap.key}/read`), true);
        }

        msgs.push(msg);
      });
      setMessages(msgs);
    });
  }, [chatID, db, userData.uid]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (message.trim() === "") return;

    const msgRef = ref(db, "messages/" + chatID);
    const newMsg = push(msgRef);
    set(newMsg, {
      senderId: userData.uid,
      receiverId: receiver.userid,
      message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
    });

    setMessage("");
    setShowEmoji(false);
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 py-4 border-l dark:border-[#4c5050] bg-white dark:bg-[#1a1a1a]">
      <div className="flex items-center gap-4 mb-4">
        {/* Back button - visible only on small screens */}
      <div className="mb-4 lg:hidden">
        <button
          onClick={onBack}
          className="text-[24px] text-blue"
        >
          ←
        </button>
      </div>
        <img src={receiver.profileImage} className="w-12 h-12 rounded-full" alt="profile" />
        <div>
          <h4 className="text-lg font-bold dark:text-white">{receiver.name}</h4>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>

      <div className="flex-1 pr-1 mb-4 space-y-3 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[75%] px-4 py-2 rounded-lg ${
              msg.senderId === userData.uid
                ? "ml-auto bg-royal_blue text-white"
                : "bg-royal_blue text-white"
            }`}
          >
            <p>{msg.message}</p>
            <p className="mt-1 text-xs text-right text-gray-300 dark:text-gray-400">
              {msg.time}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative flex items-center gap-2">
        <button
          onClick={() => setShowEmoji(!showEmoji)}
          className="text-xl text-gray-600 dark:text-white"
        >
          <FaSmile />
        </button>

        {showEmoji && (
          <div className="absolute left-0 z-10 bottom-12">
            <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" height={350} width={300} />
          </div>
        )}

        <input
          className="flex-1 px-4 py-2 border rounded-full outline-none dark:bg-black dark:text-white"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} className="px-3 py-2 text-white rounded-full bg-royal_blue">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default User_chat;
