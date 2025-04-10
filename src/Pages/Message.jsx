import React, { useState } from "react";
import User_message from "../Component/User_message";
import User_chat from "../Component/User_chat";

const Message = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <section className="flex flex-col w-full h-full lg:flex-row">
      {/* User List - Hide on mobile if a user is selected */}
      <div className={`${selectedUser ? "hidden" : "block"} lg:block lg:w-1/2`}>
        <User_message onUserSelect={setSelectedUser} />
      </div>

      {/* Chat Window - Show only if user is selected */}
      {selectedUser && (
        <div className="w-full lg:w-1/2">
          <User_chat receiver={selectedUser} onBack={() => setSelectedUser(null)} />
        </div>
      )}
    </section>
  );
};

export default Message;
