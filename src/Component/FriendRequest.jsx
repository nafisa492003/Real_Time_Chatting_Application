import React, { useState, useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { getDatabase, ref, onValue, remove, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import { MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import group_img from "../assets/group_img.png"; // Your default image

const FriendRequest = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getDatabase();
  const auth = getAuth();
  const currentUserUID = auth.currentUser?.uid;

  useEffect(() => {
    if (!currentUserUID) {
      console.error("No logged-in user found!");
      setLoading(false);
      return;
    }

    // Listen for friend requests for the current user
    const friendRequestsRef = ref(db, `users/${currentUserUID}/requested`);
    
    const unsubscribe = onValue(friendRequestsRef, (snapshot) => {
      const requests = snapshot.val();
      if (!requests) {
        setFriendRequests([]); // No requests
        setLoading(false);
        return;
      }

      // For each request, fetch the sender's data
      const requestList = [];
      const senderIds = Object.keys(requests);
      senderIds.forEach((senderId) => {
        const senderRef = ref(db, `users/${senderId}`);
        onValue(senderRef, (senderSnapshot) => {
          const senderData = senderSnapshot.val();
          if (senderData) {
            requestList.push({
              id: senderId,
              name: senderData.name,
              profileImage: senderData.profileImage || group_img, // Fallback image
            });
          }
          setFriendRequests((prevRequests) => [...prevRequests, ...requestList]); // Update the state
          setLoading(false);
        });
      });
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, [db, currentUserUID]);

  // Accept Friend Request
  const handleAcceptRequest = (senderId, senderName, senderProfileImage) => {
    if (!currentUserUID) return;

    const senderRequestedRef = ref(db, `users/${senderId}/requested/${currentUserUID}`);
    const currentUserRequestedRef = ref(db, `users/${currentUserUID}/requested/${senderId}`);
    const senderFriendRef = ref(db, `users/${senderId}/friends/${currentUserUID}`);
    const currentUserFriendRef = ref(db, `users/${currentUserUID}/friends/${senderId}`);

    // Remove requests and add as friends
    remove(senderRequestedRef)
      .then(() => remove(currentUserRequestedRef))
      .then(() => {
        update(senderFriendRef, {
          name: auth.currentUser.displayName,
          profileImage: auth.currentUser.photoURL || group_img,
        });
        update(currentUserFriendRef, {
          name: senderName,
          profileImage: senderProfileImage,
        });
      })
      .catch((error) => console.error("Error accepting friend request:", error));
  };

  // Reject Friend Request
  const handleRejectRequest = (senderId) => {
    if (!currentUserUID) return;

    const senderRequestedRef = ref(db, `users/${senderId}/requested/${currentUserUID}`);
    const currentUserRequestedRef = ref(db, `users/${currentUserUID}/requested/${senderId}`);

    remove(senderRequestedRef)
      .then(() => remove(currentUserRequestedRef))
      .catch((error) => console.error("Error rejecting friend request:", error));
  };

  return (
    <div className="w-full bg-white rounded-[8px] shadow-2xl dark:bg-[#252728] p-3 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold font-Poppins text-[20px] dark:text-blue">Friend Requests</h2>
        <HiDotsVertical size={20} className="text-blue" />
      </div>

      {loading ? (
        <p className="text-center dark:text-white">Loading friend requests...</p>
      ) : friendRequests.length > 0 ? (
        friendRequests.map((request) => (
          <div key={request.id} className="flex items-center justify-between py-3 border-b-2 dark:border-[#4c5050]">
            <div className="flex items-center gap-4">
              <img
                className="object-cover rounded-full w-[50px] h-[50px]"
                src={request.profileImage}
                alt="User"
              />
              <div>
                <h4 className="text-[16px] md:text-[18px] font-Poppins font-semibold dark:text-white">
                  {request.name}
                </h4>
                <span className="text-[14px] font-Poppins font-normal dark:text-white">
                  Sent you a friend request
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-royal_blue dark:text-white" onClick={() => handleAcceptRequest(request.id, request.name, request.profileImage)}>
                <MdOutlineDone size={20} />
              </button>
              <button className="text-royal_blue dark:text-white" onClick={() => handleRejectRequest(request.id)}>
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

export default FriendRequest;
