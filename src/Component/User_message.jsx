import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

const User_message = ({ onUserSelect }) => {
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  const userData = useSelector((state) => state.user.user);
  if (!userData) return null;
//   users data
useEffect(() => {
  const userRef = ref(db, "users/");
  onValue(userRef, (snapshot) => {
    let arr = [];
    snapshot.forEach((item) => {
      if (userData.uid !== item.key) {
        arr.push({ ...item.val(), userid: item.key });
      }
    });
    setUserList(arr);
  });
}, [userData.uid]);
  return (
    <div className="w-full px-4 lg:w-6/12">
      {userList.map((item) => (
        <div
          key={item.userid}
          onClick={() => onUserSelect(item)} // 🔥 Pass selected user
          className="cursor-pointer flex items-center justify-between py-3 border-b-2 dark:border-[#4c5050]"
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
        </div>
      ))}
    </div>
  );
};


export default User_message;
