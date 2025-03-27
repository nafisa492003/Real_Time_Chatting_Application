import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FaPlus, FaMinus } from "react-icons/fa";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";

const User_List = () => {
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  const [friendList, setFriend] = useState([]);
  const userData = useSelector((selector) => selector.user.user);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState("");
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    setLoading(true);
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userData.uid !== item.key) {
          arr.push({ ...item.val(), userid: item.key });
        }
      });
      setUserList(arr);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const UsersRef = ref(db, "users/");
    onValue(UsersRef, (snapshot) => {
      snapshot.forEach((item) => {
        if (userData.uid === item.key) {
          setUserDetails(item.val());
        }
      });
    });
  }, [userData.uid, db]);

  useEffect(() => {
    setLoading(true);
    const friendRef = ref(db, "friendrequest/");
    onValue(friendRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({
          requestId: item.key,
          senderId: item.val().senderid,
          receiverId: item.val().receiverid,
        });
      });
      setFriend(arr);
      setLoading(false);
    });
  }, []);
  //
 

  const handleFriendRequest = (item) => {
    set(push(ref(db, "friendrequest/")), {
      sendername: userData.displayName,
      senderid: userData.uid,
      senderimage: userDetails.profileImage,
      recivername: item.name,
      receiverid: item.userid,
    });
  };

  const handleCancelRequest = (item) => {
    const request = friendList.find(
      (req) =>
        (req.senderId === userData.uid && req.receiverId === item.userid) ||
        (req.receiverId === userData.uid && req.senderId === item.userid)
    );

    if (request) {
      remove(ref(db, `friendrequest/${request.requestId}`));
    }
  };
  useEffect(() => {
    setLoading(true);
    const friendsRef = ref(db, "friend/");
    onValue(friendsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({
          requestId: item.key,
          senderId: item.val().senderid,
          receiverId: item.val().receiverid,
        });
      });
      setFriends(arr);
      setLoading(false);
    });
  }, []);
  return (
    <div className="w-full bg-white rounded-[8px] shadow-2xl dark:bg-[#252728] p-3 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold font-Poppins text-[20px] dark:text-blue">
          User List
        </h2>
        <HiDotsVertical size={20} className="text-blue" />
      </div>
      {loading ? (
        <h1 className="text-[20px] text-center font-Open_Sans text-blue">
          Loading
        </h1>
      ) : (
        userList.map((item) => {
          const isRequested = friendList.some(
            (req) =>
              (req.senderId === userData.uid &&
                req.receiverId === item.userid) ||
              (req.receiverId === userData.uid && req.senderId === item.userid)
          );
          const isfriend = friends.some(
            (req) =>
              (req.senderId === userData.uid &&
                req.receiverId === item.userid) ||
              (req.receiverId === userData.uid && req.senderId === item.userid)
          );
          return (
            <div
              key={item.userid}
              className="flex items-center justify-between py-3 border-b-2 dark:border-[#4c5050]"
            >
              <div className="flex items-center gap-4">
                <img
                  className="object-cover rounded-full w-[50px] h-[50px]"
                  src={item.profileImage}
                  alt="User"
                />
                <div>
                  <h4 className="text-[16px] md:text-[18px] font-Poppins font-semibold dark:text-white">
                    {item.name}
                  </h4>
                  <span className="text-[14px] font-Poppins font-normal dark:text-white">
                    Hi there!
                  </span>
                </div>
              </div>
              {isfriend ? <span className="text-[14px] font-Poppins font-normal dark:text-white">
                Friend
              </span> :
              
         isRequested ? (
                <button
                  onClick={() => handleCancelRequest(item)}
                  className="font-semibold font-Poppins text-[16px] md:text-[20px] text-white bg-blue px-4 rounded-lg py-2"
                >
                  <FaMinus />
                </button>
              ) : (
                <button
                  onClick={() => handleFriendRequest(item)}
                  className="font-semibold font-Poppins text-[16px] md:text-[20px] text-white bg-blue px-4 rounded-lg py-2"
                >
                  <FaPlus />
                </button>
              )
              }

            </div>
          );
        })
      )}
    </div>
  );
};

export default User_List;
