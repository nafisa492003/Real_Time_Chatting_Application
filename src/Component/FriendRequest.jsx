import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineDone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import group_img from "../assets/group_img.png";

const FriendRequest = () => {

  return (
    <div className="w-full bg-white rounded-[8px] shadow-2xl dark:bg-[#252728] p-3 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold font-Poppins text-[20px] dark:text-blue">
          Friend Requests
        </h2>
        <HiDotsVertical size={20} className="text-blue" />
      </div>
          <div
            className="flex items-center justify-between py-3 border-b-2 dark:border-[#4c5050]"
          >
            <div className="flex items-center gap-4">
              <img
                src={group_img}
                className="object-cover rounded-full w-[50px] h-[50px]"
              />
              <div>
                <h4 className="text-[16px] md:text-[18px] font-Poppins font-semibold dark:text-white">
                  friend
                </h4>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button>
                <MdOutlineDone
                  size={28}
                  className="text-royal_blue dark:text-white"
                />
              </button>
              <button>
                <RxCross1
                  size={24}
                  className="text-royal_blue dark:text-white"
                />
              </button>
            </div>
          </div>
    </div>
  );
};

export default FriendRequest;