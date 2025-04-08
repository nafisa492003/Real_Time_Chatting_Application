import React from 'react'
import Friends from "../Component/Friends";
import User_List from "../Component/User_List";
import Blocked_Users from "../Component/Blocked_Users";
import FriendRequest from "../Component/FriendRequest";
const Notification = () => {
  return (
    <div className="w-full">
        <User_List />
        <FriendRequest />
        <Friends />
        <Blocked_Users />
      </div>
  )
}

export default Notification