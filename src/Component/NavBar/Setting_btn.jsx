import React from 'react'
import { NavLink } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
const Setting_btn = () => {
  return (
   <NavLink
            to="/setting"
            className={({ isActive }) =>
              isActive ? "p-5 bg-white dark:bg-black dark:text-blue rounded-full text-blue" : "text-[#bad1ff] dark:text-white"
            }
          >
           <IoSettings size={40}/>
          </NavLink>
  )
}

export default Setting_btn