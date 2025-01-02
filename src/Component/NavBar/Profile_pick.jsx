import React, { useState } from "react";
import profile_img from "../../assets/profile_pick.png";
import { RiUploadCloud2Fill } from "react-icons/ri";
const Profile_pick = () => {
  const [profilepick, setProfilepick] = useState(true);
  return (
    <section className="relative">
      {profilepick && 
      <div className="w-[300px] h-[340px] md:w-[450px] md:h-[500px] md:left-[150px] lg:w-[800px] lg:h-[500px] bg-slate-200 absolute left-1 lg:left-[400px] top-[60px] lg:top-[100px] p-1 lg:p-4 z-50 rounded-lg flex gap-3 items-center justify-center">
       <div>
        
       </div>
      </div>}
      <div
        onClick={() => setProfilepick(!profilepick)}
        className="w-[100px] h-[100px] rounded-full flex items-center justify-center group relative cursor-pointer"
      >
        <RiUploadCloud2Fill className="text-[50px] group-hover:absolute z-10 group-hover:text-white" />
        <img className="group-hover:brightness-50" src={profile_img} alt="" />
      </div>
    </section>
  );
};

export default Profile_pick;
