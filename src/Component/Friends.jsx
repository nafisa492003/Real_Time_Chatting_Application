import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";

const Friends = () => {
  const db = getDatabase();
  const [friendList, setFriend] = useState([]);
  const friendData = useSelector((secletor) => secletor.user.user);
  const [loading, setLoading] = useState(false);
  console.log(friendData, "userdata");
  useEffect(() => {
    setLoading(true);
    const friendRef = ref(db, "friend/");
    onValue(friendRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((iteam) => {
        if (
          friendData.uid == iteam.val().receiverid ||
          friendData.uid == iteam.val().senderid
        ) {
          arr.push({ ...iteam.val(), userid: iteam.key });
        }
      });
      setFriend(arr);
      setLoading(false);
    });
    
  }, [db, friendData.uid]);
  
  console.log(friendList, "hi friends !!!!");
  // block function
  const handleBlock = (iteam) => {
    const blockedUser = {
      blockerid: friendData.uid,
      blockedid: friendData.uid === iteam.senderid ? iteam.receiverid : iteam.senderid,
      blockername: friendData.displayName,
      blockedname: friendData.uid === iteam.senderid ? iteam.receivername : iteam.sendername,
      blockerimage: iteam.receiverimage,
      blockedimage: iteam.uid === iteam.senderid ? iteam.receiverimage : iteam.senderimage,
    };
    set(push(ref(db, "blocked/")), blockedUser).then(() => {
      remove(ref(db, `friend/${iteam.userid}`));
    });
  };
  return (
    <div className="w-full bg-white rounded-[8px] shadow-2xl dark:bg-[#252728] p-3 mb-6">
      {/* title */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold font-Poppins text-[20px] dark:text-blue">
          Friends
        </h2>
        <HiDotsVertical size={20} className=" text-blue" />
      </div>
      {/* title */}
      {/* img with title */}
      {loading ? (
        <h1 className="text-[20px] text-center font-Open_Sans text-blue">
          Loading
        </h1>
      ) : (
        friendList.map((iteam) => (
          <div
            key={iteam.id}
            className="flex items-center justify-between py-3 border-b-2 dark:border-[#4c5050]"
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  friendData.uid === iteam.senderid
                    ? iteam.receiverimage
                    : iteam.senderimage || "/default.jpg"
                }
                className="object-cover rounded-full w-[50px] h-[50px]"
                alt="#"
              />
              <div>
                <h4 className="text-[16px] md:text-[18px] font-Poppins font-semibold dark:text-white">
                  {friendData.uid === iteam.senderid
                    ? iteam.receivername || "Unknown"
                    : iteam.sendername || "Unknown"}
                </h4>
                <span className="text-[14px] font-Poppins font-normal dark:text-white">
                  Hi Guys!
                </span>
              </div>
            </div>
            {/* img with title */}
            <button onClick={()=>handleBlock(iteam)} className="font-semibold font-Poppins text-[16px]  md:text-[20px] text-white bg-blue px-4 rounded-lg">
              block
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Friends;
