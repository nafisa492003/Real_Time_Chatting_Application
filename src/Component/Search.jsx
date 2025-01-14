import React from "react";
import { FiSearch } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
const Search = () => {
  return (
    <div className="relative w-full mb-6">
      <FiSearch size={20} className="absolute top-[18px] left-[12px] text-royal_blue dark:text-white" />
      <HiDotsVertical size={20} className="absolute right-[12px] top-[18px] text-blue"/>
      <input
        className="w-full pl-[45px] py-4 rounded-[8px] shadow-lg outline-none pr-6 dark:bg-[#333334]"
        type="text"
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
