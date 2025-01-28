import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FaPlus, FaMinus } from "react-icons/fa";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import { data } from "autoprefixer";
const User_List = () => {
  const db = getDatabase();
  const [userList,setUserList]=useState([])
  const userData = useSelector((secletor)=>secletor.user.user)
  console.log(userData,"userdata");
  
  useEffect(()=>{
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      let arr =[]
      snapshot.forEach((iteam)=>{
        console.log(iteam.key,"data");
        if(userData.uid != iteam.key){
          arr.push(iteam.val())
        }
      })
      setUserList(arr)
    });
  },[])
  console.log(userList , "users");
  
  return (
    <div className="w-full bg-white rounded-[8px] shadow-2xl dark:bg-[#252728] p-3 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold font-Poppins text-[20px] dark:text-blue">
          User List
        </h2>
        <HiDotsVertical size={20} className=" text-blue" />
      </div>
      {userList.map((iteam)=>(
      <div className="flex items-center justify-between py-3 border-b-2 dark:border-[#4c5050]">
        <div className="flex items-center gap-4">
          <img
            className="object-cover rounded-full w-[50px] h-[50px]"
            src={iteam.profileImage}
            alt="User"
          />
          <div>
            <h4 className="text-[16px] md:text-[18px] font-Poppins font-semibold dark:text-white">
              {iteam.name}
            </h4>
            <span className="text-[14px] font-Poppins font-normal dark:text-white">
              Hi there!
            </span>
          </div>
        </div>
        <button className="font-semibold font-Poppins text-[16px] md:text-[20px] text-white bg-blue px-4 rounded-lg py-2">
          <FaMinus />
          <FaPlus />
        </button>
      </div>
      ))}
    </div>
  );
};

export default User_List;
