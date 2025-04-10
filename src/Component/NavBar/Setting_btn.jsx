import React from "react";
import { NavLink } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
const Setting_btn = () => {
  return (
    <NavLink className={`p-5  dark:text-blue rounded-full text-boder_blue`}>
      <IoSettings className="text-[30px] md:text-[40px]" />
    </NavLink>
  );
};

export default Setting_btn;
