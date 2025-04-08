import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  push,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";

const Blocked_Users = () => {
  const db = getDatabase();
  const [blockedList, setBlockedList] = useState([]);
  const currentUser = useSelector((selector) => selector.user.user);

  useEffect(() => {
    const blockRef = ref(db, "blocked/");
    onValue(blockRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().blockerid === currentUser.uid) {
          arr.push({ ...item.val(), blockid: item.key });
        }
      });
      setBlockedList(arr);
    });
  }, [db, currentUser.uid]);

  const handleUnblock = (user) => {
    // Add back to friends
    set(push(ref(db, "friend/")), {
      senderid: currentUser.uid,
      sendername: currentUser.displayName,
      senderimage: user.blockerimage,
      receiverid: user.blockedid,
      receivername: user.blockedname, // ✅ correct key
      receiverimage: user.blockedimage,
    }).then(() => {
      // Remove from blocked
      remove(ref(db, "blocked/" + user.blockid));
    });
  };

  return (
    <div className="w-full bg-white rounded-[8px] shadow-2xl dark:bg-[#252728] p-3 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold font-Poppins text-[20px] dark:text-blue">
          Blocked Users
        </h2>
        <HiDotsVertical size={20} className=" text-blue" />
      </div>

      {blockedList.map((user) => (
        <div
          key={user.blockid}
          className="flex items-center justify-between py-3 border-b-2 dark:border-[#4c5050]"
        >
          <div className="flex items-center gap-4">
            <img
              src={user.blockedimage}
              className="object-cover rounded-full w-[50px] h-[50px]"
              alt="#"
            />
            <div>
              <h4 className="text-[16px] md:text-[18px] font-Poppins font-semibold dark:text-white">
                {user.blockedname}
              </h4>
              <span className="text-[14px] font-Poppins font-normal dark:text-white">
                This user is blocked
              </span>
            </div>
          </div>
          <button
            onClick={() => handleUnblock(user)}
            className="font-semibold font-Poppins text-[16px] md:text-[20px] text-white bg-blue px-4 rounded-lg"
          >
            Unblock
          </button>
        </div>
      ))}
    </div>
  );
};

export default Blocked_Users;
