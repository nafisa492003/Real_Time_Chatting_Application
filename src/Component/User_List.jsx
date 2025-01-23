import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import group_img from "../assets/group_img.png";
import { FaPlus, FaMinus } from "react-icons/fa";
import { getDatabase, ref, onValue, remove, set } from "firebase/database";
import { getAuth } from "firebase/auth";

const User_List = () => {
  const [users, setUsers] = useState([]);
  const db = getDatabase();
  const auth = getAuth();
  const currentUser = auth.currentUser?.uid;

  useEffect(() => {
    const usersRef = ref(db, "users");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userList = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
            requested: data[key]?.friendRequests?.[currentUser] ? true : false,
          }))
          .filter((user) => user.id !== currentUser);
        setUsers(userList);
      }
    });
  }, [db, currentUser]);

  const handleRequest = (receiverId, isRequested) => {
    const senderUid = auth.currentUser?.uid;
    const senderName = auth.currentUser?.displayName;
    const senderProfileImage = auth.currentUser?.photoURL;

    const receiverRequestRef = ref(
      db,
      `users/${receiverId}/friendRequests/${senderUid}`
    );

    if (isRequested) {
      remove(receiverRequestRef).then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === receiverId ? { ...user, requested: false } : user
          )
        );
      });
    } else {
      set(receiverRequestRef, {
        name: senderName || "Anonymous",
        profileImage: senderProfileImage || group_img,
        message: "Hi, I want to connect with you!",
      }).then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === receiverId ? { ...user, requested: true } : user
          )
        );
      });
    }
  };

  return (
    <div className="w-full bg-white rounded-[8px] shadow-2xl dark:bg-[#252728] p-3 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold font-Poppins text-[20px] dark:text-blue">
          User List
        </h2>
        <HiDotsVertical size={20} className=" text-blue" />
      </div>
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between py-3 border-b-2 dark:border-[#4c5050]"
        >
          <div className="flex items-center gap-4">
            <img
              className="object-cover rounded-full w-[50px] h-[50px]"
              src={user.profileImage || group_img}
              alt="User"
            />
            <div>
              <h4 className="text-[16px] md:text-[18px] font-Poppins font-semibold dark:text-white">
                {user.name}
              </h4>
              <span className="text-[14px] font-Poppins font-normal dark:text-white">
                {user.message || "Hi there!"}
              </span>
            </div>
          </div>
          <button
            className="font-semibold font-Poppins text-[16px] md:text-[20px] text-white bg-blue px-4 rounded-lg py-2"
            onClick={() => handleRequest(user.id, user.requested)}
          >
            {user.requested ? <FaMinus /> : <FaPlus />}
          </button>
        </div>
      ))}
    </div>
  );
};

export default User_List;