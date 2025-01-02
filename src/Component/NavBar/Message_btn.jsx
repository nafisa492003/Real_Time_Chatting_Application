import React from 'react'
import { NavLink } from "react-router-dom";
import { AiFillMessage } from "react-icons/ai";
const Message_btn = () => {
  return (
    <NavLink
         to="/message"
         className={({ isActive }) =>
           isActive ? "p-5 bg-white dark:bg-black dark:text-blue rounded-full text-blue" : "text-[#bad1ff] dark:text-white"
         }
       >
        <AiFillMessage size={40}/>
       </NavLink>
  )
}

export default Message_btn