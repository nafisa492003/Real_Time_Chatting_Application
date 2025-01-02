import React from 'react'
import { NavLink } from "react-router-dom";
import { IoNotificationsSharp } from "react-icons/io5";
const Notification_btn = () => {
  return (
    <NavLink
             to="/notification"
             className={({ isActive }) =>
               isActive ? "p-5 bg-white dark:bg-black dark:text-blue rounded-full text-blue" : "text-[#bad1ff] dark:text-white"
             }
           >
            <IoNotificationsSharp size={40}/>
           </NavLink>
  )
}

export default Notification_btn