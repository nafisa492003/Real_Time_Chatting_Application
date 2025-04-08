import React from "react";
import Group_list from "../Component/Group_list";
import My_group from "../Component/My_group";
import Friends from "../Component/Friends";
import User_List from "../Component/User_List";
import Blocked_Users from "../Component/Blocked_Users";
import FriendRequest from "../Component/FriendRequest";
const Home = () => {
  return (
    <section className="flex flex-col justify-between lg:flex-row">
      {/* <div className="w-full lg:w-[500px]">
        <Group_list />
      </div>
      <div className="w-full lg:w-[500px]">
        <My_group />
      </div> */}
      <div className='w-full'>
     section for post
     
    </div>
      <div className="hidden w-full lg:w-1/2 lg:block">
        <User_List />
        <Friends />
        <FriendRequest />
        <Blocked_Users />
      </div>
    </section>
  );
};

export default Home;
