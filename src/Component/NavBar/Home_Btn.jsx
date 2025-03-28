import React from "react";
import { IoHome } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Home_Btn = () => {
  return (
    <NavLink
      to="/"
      className={({ isActive }) =>
        isActive ? "p-5 bg-white dark:bg-black dark:text-blue rounded-full text-blue" : "text-[#bad1ff] dark:text-white"
      }
    >
      <IoHome size={40} />
    </NavLink>
  );
};

export default Home_Btn;

