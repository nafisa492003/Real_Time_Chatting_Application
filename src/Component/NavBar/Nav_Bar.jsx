import React, { useState } from "react";
import Profile_pick from "./Profile_pick";
import Home_Btn from "./Home_Btn";
import Mood_btn from "./Mood_btn";
import Message_btn from "./Message_btn";
import { MdMenuOpen } from "react-icons/md";
import { IoCloseCircleSharp } from "react-icons/io5";
import Notification_btn from "./Notification_btn";
import Setting_btn from "./Setting_btn";
import Log_out_btn from "./Log_out_btn";
const Nav_Bar = () => {
  const [nav, setNav] = useState(false);
  return (
    <section className="relative dark:bg-black">
      {nav ? (
        <div className='w-[140px] h-[832px] md:h-screen py-[14px] px-[14px] rounded-[20px] bg-blue dark:bg-gray-900 absolute transition-colors duration-150 z-50'>
          <IoCloseCircleSharp onClick={() => setNav(!nav)} size={50} className="mb-3 ml-8 text-white lg:hidden" />
        <div className='flex flex-col items-center gap-[45px] md:gap-[65px]'>
        <Profile_pick/>
        <Home_Btn/>
        <Message_btn/>
        <Notification_btn/>
        <Setting_btn/>
        <Mood_btn/>
        <Log_out_btn/>
        </div>
       </div>
      ) : (
        <MdMenuOpen
          onClick={() => setNav(!nav)}
          size={60}
          className="lg:hidden text-royal_blue dark:text-white"
        />
      )}

      <div className="w-[186px] h-[832px] py-[30px] px-10 rounded-[20px] bg-blue dark:bg-gray-900 hidden lg:block sticky">
        <div className="flex flex-col items-center gap-[50px]">
          <Profile_pick />
          <Home_Btn />
          <Message_btn />
          <Notification_btn/>
          <Setting_btn/>
          <Mood_btn />
          <Log_out_btn/>
        </div>
      </div>
    </section>
  );
};

export default Nav_Bar;
