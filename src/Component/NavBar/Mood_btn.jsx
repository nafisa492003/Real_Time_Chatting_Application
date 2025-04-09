import React from 'react'
import { useDarkMode } from './DarkModeProvider';
import { IoMoon } from "react-icons/io5";
import { TbSunFilled } from "react-icons/tb";
const Mood_btn = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    
    <button
      onClick={toggleDarkMode}
      className="p-3 rounded-full bg-royal_blue text-blue dark:bg-black dark:text-blue"
    >
      {darkMode ? <TbSunFilled className="text-[30px] md:text-[40px]"/> : <IoMoon className="text-[30px] md:text-[40px]" />}
    </button>
  
  )
}

export default Mood_btn