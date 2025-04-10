import React from "react";
import { NavLink } from "react-router-dom";
import { HiMiniUsers } from "react-icons/hi2";
const Notification_btn = () => {
  return (
    <NavLink
      to="/notification"
      className={({ isActive }) =>
        isActive
          ? "p-5 bg-white dark:bg-black dark:text-blue rounded-full text-blue"
          : "text-[#bad1ff] dark:text-white"
      }
    >
      <HiMiniUsers className="text-[30px] md:text-[40px]" />
    </NavLink>
  );
};

export default Notification_btn;
