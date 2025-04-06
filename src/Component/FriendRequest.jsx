import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineDone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const FriendRequest = () => {
  const db = getDatabase();
  const [friendList, setFriend] = useState([]);
  const friendData = useSelector((secletor) => secletor.user.user);
  const [loading, setLoading] = useState(false);
  console.log(friendData, "userdata");
  useEffect(() => {
    setLoading(true);
    const friendRef = ref(db, "friendrequest/");
    onValue(friendRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((iteam) => {
        if (friendData.uid == iteam.val().receiverid) {
          arr.push({ ...iteam.val(), userid: iteam.key });
        }
      });
      setFriend(arr);
      setLoading(false);
    });
  }, []);
  console.log(friendList, "friendrequest");
  
  // handale friend request
  const handlefriend = (iteam) => {
    const senderImage =  iteam.receiverimage || "";
    const receiverImage = iteam.senderimage || "";
  
    set(push(ref(db, "friend/")), {
      sendername: friendData.displayName,
      senderid: friendData.uid,
      senderimage: senderImage, 
      receiverimage: receiverImage, 
      receivername: iteam.sendername,
      receiverid: iteam.senderid,
    }).then(() => {
      remove(ref(db, "friendrequest/" + iteam.userid));
      toast.success("Now you're friends!");
    });
  };
  // Handle rejecting friend request
  const handleRejectFriendRequest = (item) => {
    remove(ref(db, "friendrequest/" + item.userid))
      .then(() => {
        toast.success("Friend request removed successfully!");
      })
      .catch((error) => {
        console.error("Error removing friend request:", error);
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
      {loading ? (
        <h1 className="text-[20px] text-center font-Open_Sans text-blue">
          Loading
        </h1>
      ) : (
        friendList.map((iteam) => (
          <div className="flex items-center justify-between py-3 border-b-2 dark:border-[#4c5050]">
            <div className="flex items-center gap-4">
              <img
                src={iteam.senderimage}
                className="object-cover rounded-full w-[50px] h-[50px]"
              />
              <div>
                <h4 className="text-[16px] md:text-[18px] font-Poppins font-semibold dark:text-white">
                  {iteam.sendername}
                </h4>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button>
                <MdOutlineDone
                  onClick={() =>  handlefriend(iteam)}
                  size={28}
                  className="text-royal_blue dark:text-white"
                />
              </button>
              <button>
                <RxCross1
                  onClick={() => handleRejectFriendRequest(iteam)}
                  size={24}
                  className="text-royal_blue dark:text-white"
                />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FriendRequest;
