import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineDone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import group_img from "../assets/group_img.png";
import { getDatabase, ref, onValue, remove, update } from "firebase/database";
import { getAuth } from "firebase/auth";

const FriendRequest = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const db = getDatabase();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) {
      console.log("No logged-in user");
      return;
    }

    const friendRequestsRef = ref(db, `users/${currentUser.uid}/friendRequests`);

    const unsubscribe = onValue(friendRequestsRef, (snapshot) => {
      if (snapshot.exists()) {
        const requests = Object.entries(snapshot.val()).map(([id, data]) => {
          console.log("Data Retrieved for Friend Request:", data);
          return {
            id,
            name: data.name || "Anonymous",
            profileImage: data.profileImage || group_img,
            message: data.message || "No message",
          };
        });
        console.log("Friend Requests Retrieved:", requests);
        setFriendRequests(requests);
      } else {
        console.log("No friend requests found");
        setFriendRequests([]);
      }
    });

    return () => unsubscribe();
  }, [db, currentUser]);

  const handleAcceptRequest = (senderId, senderName, senderProfileImage) => {
    if (!currentUser) return;

    console.log(`Accepting friend request from: ${senderName} (${senderId})`);

    const senderFriendRef = ref(
      db,
      `users/${senderId}/friends/${currentUser.uid}`
    );
    const currentUserFriendRef = ref(
      db,
      `users/${currentUser.uid}/friends/${senderId}`
    );
    const senderRequestRef = ref(
      db,
      `users/${currentUser.uid}/friendRequests/${senderId}`
    );

    Promise.all([
      update(senderFriendRef, {
        name: currentUser.displayName || "Anonymous",
        profileImage: currentUser.photoURL || group_img,
      }),
      update(currentUserFriendRef, {
        name: senderName,
        profileImage: senderProfileImage || group_img,
      }),
      remove(senderRequestRef),
    ])
      .then(() => {
        console.log(`Friend request from ${senderName} accepted successfully`);
        setFriendRequests((prev) =>
          prev.filter((request) => request.id !== senderId)
        );
      })
      .catch((error) => {
        console.error("Error accepting friend request:", error);
      });
  };

  const handleRejectRequest = (senderId) => {
    if (!currentUser) return;

    console.log(`Rejecting friend request from user ID: ${senderId}`);

    const senderRequestRef = ref(
      db,
      `users/${currentUser.uid}/friendRequests/${senderId}`
    );

    remove(senderRequestRef)
      .then(() => {
        console.log(`Friend request from user ID: ${senderId} rejected`);
        setFriendRequests((prev) =>
          prev.filter((request) => request.id !== senderId)
        );
      })
      .catch((error) => {
        console.error("Error rejecting friend request:", error);
      });
  };

  return (
    <div className="w-full bg-white rounded-[8px] shadow-2xl dark:bg-[#252728] p-3 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold font-Poppins text-[20px] dark:text-blue">
          Friend Requests
        </h2>
        <HiDotsVertical size={20} className="text-blue" />
      </div>
      {friendRequests.length > 0 ? (
        friendRequests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between py-3 border-b-2 dark:border-[#4c5050]"
          >
            <div className="flex items-center gap-4">
              <img
                src={request.profileImage || group_img}
                alt={request.name || "User"}
                className="object-cover rounded-full w-[50px] h-[50px]"
              />
              <div>
                <h4 className="text-[16px] md:text-[18px] font-Poppins font-semibold dark:text-white">
                  {request.name || "Anonymous"}
                </h4>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  handleAcceptRequest(
                    request.id,
                    request.name,
                    request.profileImage
                  )
                }
              >
                <MdOutlineDone
                  size={28}
                  className="text-royal_blue dark:text-white"
                />
              </button>
              <button onClick={() => handleRejectRequest(request.id)}>
                <RxCross1
                  size={24}
                  className="text-royal_blue dark:text-white"
                />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="font-semibold text-blue">No friend requests found.</p>
      )}
    </div>
  );
};

export default FriendRequest;
