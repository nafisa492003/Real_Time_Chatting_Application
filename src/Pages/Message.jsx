import React, { useState } from "react";
import User_message from "../Component/User_message";
import User_chat from "../Component/User_chat";

const Message = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <section className="flex">
      <User_message onUserSelect={setSelectedUser} />
      {selectedUser && (
        <User_chat receiver={selectedUser} />
      )}
    </section>
  );
};

export default Message;
