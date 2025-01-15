import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import group_img from "../assets/group_img.png";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineDone } from "react-icons/md";

const Friend_Request = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const db = getDatabase();
  const auth = getAuth();
  const currentUser = auth.currentUser?.uid;

  useEffect(() => {
    const friendRequestsRef = ref(db, `users/${currentUser}/friendRequests`);
    onValue(friendRequestsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const requests = Object.keys(data).map((key) => ({
          id: key, // Sender's UID
          ...data[key], // Sender's details (name, profileImage, message)
        }));
        setFriendRequests(requests);
      } else {
        setFriendRequests([]);
      }
    });
  }, [db, currentUser]);

  const handleAcceptRequest = (senderId) => {
    const requestRef = ref(db, `users/${currentUser}/friendRequests/${senderId}`);
    const receiverFriendListRef = ref(db, `users/${currentUser}/friends/${senderId}`);
    const senderFriendListRef = ref(db, `users/${senderId}/friends/${currentUser}`);

    update(requestRef, null).then(() => {
      update(receiverFriendListRef, { accepted: true }).then(() => {
        update(senderFriendListRef, { accepted: true });
      });
    });
  };

  const handleRejectRequest = (senderId) => {
    const requestRef = ref(db, `users/${currentUser}/friendRequests/${senderId}`);
    update(requestRef, null);
  };

  return (
    <div className="w-full bg-white rounded-[8px] shadow-2xl dark:bg-[#252728] p-3 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold font-Poppins text-[20px] dark:text-blue">
          Friend Requests
        </h2>
        <HiDotsVertical size={20} className=" text-blue" />
      </div>
      {friendRequests.length > 0 ? (
        friendRequests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between py-3 border-b-2 dark:border-[#4c5050]"
          >
            <div className="flex items-center gap-4">
              <img
                className="object-cover rounded-full w-[50px] h-[50px]"
                src={request.profileImage || group_img}
                alt="User"
              />
              <div>
                <h4 className="text-[16px] md:text-[18px] font-Poppins font-semibold dark:text-white">
                  {request.name}
                </h4>
                <span className="text-[14px] font-Poppins font-normal dark:text-white">
                  {request.message || "Hi there!"}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="text-royal_blue dark:text-white"
                onClick={() => handleAcceptRequest(request.id)}
              >
                <MdOutlineDone size={20} />
              </button>
              <button
                className="text-royal_blue dark:text-white"
                onClick={() => handleRejectRequest(request.id)}
              >
                <RxCross2 size={20} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center dark:text-white">No friend requests yet</p>
      )}
    </div>
  );
};

export default Friend_Request;