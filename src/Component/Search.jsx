import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";

const Search = ({ userList }) => {
  const [searchText, setSearchText] = useState("");

  // filtering logic
  const filteredUsers = userList?.filter(
    (user) =>
      user.name &&
      user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="relative w-full mb-6">
      <FiSearch
        size={20}
        className="absolute top-[18px] left-[12px] text-royal_blue dark:text-white"
      />
      <HiDotsVertical
        size={20}
        className="absolute right-[12px] top-[18px] text-blue"
      />
      <input
        className="w-full pl-[45px] py-4 rounded-[8px] shadow-lg outline-none pr-6 dark:bg-[#333334] dark:text-white"
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Show filtered users */}
      {searchText && (
        <div className="absolute z-50 bg-white dark:bg-[#2f2f30] shadow-md w-full mt-1 rounded-[8px] max-h-[250px] overflow-y-auto">
          {filteredUsers?.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.userid}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3f3f40] cursor-pointer"
              >
                <img
                  src={user.profileImage}
                  alt="user"
                  className="object-cover w-8 h-8 rounded-full"
                />
                <span className="font-Poppins dark:text-white">
                  {user.name}
                </span>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500 dark:text-gray-300">
              No users found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
