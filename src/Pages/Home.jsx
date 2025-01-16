import React from 'react'
import Group_list from '../Component/Group_list'

import Friends from '../Component/Friends'
import My_group from '../Component/My_group'
import User_List from '../Component/User_List'
import Blocked_Users from '../Component/Blocked_Users'
import FriendRequest from '../Component/FriendRequest'
const Home = () => {
  return (
    <section className='flex flex-col justify-between lg:flex-row'>
    <div className='w-full lg:w-[500px]'>
      <Group_list/>
      <FriendRequest/>
    </div>
    <div className='w-full lg:w-[500px]'>
      <Friends/>
      <My_group/>
    </div>
    <div className='w-full lg:w-[500px]'>
      <User_List/>
      <Blocked_Users/>
    </div>
    </section>
  )
}

export default Home