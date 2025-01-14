import React from 'react'
import { HiDotsVertical } from "react-icons/hi";
import group_img from "../assets/group_img.png";
const My_group = () => {
  return (
    <div className="w-full bg-white rounded-[8px] shadow-2xl dark:bg-[#252728] p-3 mb-6">
    {/* title */}
    <div className="flex items-center justify-between mb-3">
      <h2 className="font-semibold font-Poppins text-[20px] dark:text-blue">
      My Groups
      </h2>
      <HiDotsVertical size={20} className=" text-blue" />
    </div>
    {/* title */}
    {/* img with title */}
    <div className="flex items-center justify-between py-3 border-b-2 dark:border-[#4c5050]">
      <div className="flex items-center gap-4">
        <img src={group_img} alt="#" />
        <div>
          <h4 className="text-[16px] md:text-[18px] font-Poppins font-semibold dark:text-white">
            Friends Reunion
          </h4>
          <span className="text-[14px] font-Poppins font-normal dark:text-white">
            Hi Guys, Wassup!
          </span>
        </div>
      </div>
      {/* img with title */}
    </div>
  </div>
  )
}

export default My_group