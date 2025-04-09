import React, { useState, useEffect } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { GrSend } from "react-icons/gr";
import { BsEmojiSmileFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa6";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { useSelector } from "react-redux";

const Post = () => {
  const db = getDatabase();
  const userData = useSelector((state) => state.user.user);
  const [userDetails, setUserDetails] = useState({});
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  // Fetch user profile image and name
  useEffect(() => {
    const userRef = ref(db, `users/${userData.uid}`);
    onValue(userRef, (snapshot) => {
      setUserDetails(snapshot.val());
    });
  }, [userData.uid]);

  // Fetch all posts
  useEffect(() => {
    const postRef = ref(db, "posts/");
    onValue(postRef, (snapshot) => {
      let postArr = [];
      snapshot.forEach((item) => {
        postArr.push({ id: item.key, ...item.val() });
      });
      // Sort by latest first
      setPosts(postArr.reverse());
    });
  }, []);

  const handlePost = () => {
    if (postText.trim() === "") return;

    const postRef = push(ref(db, "posts/"));
    set(postRef, {
      text: postText,
      userId: userData.uid,
      userName: userData.displayName,
      profileImage: userDetails.profileImage,
      timestamp: Date.now(),
    });

    setPostText(""); // clear input
  };

  return (
    <section className="w-full p-3">
      {/* Post Input */}
      <div className="w-full p-6 bg-slate-50 dark:bg-[#252728] mb-6 rounded-2xl">
        <div className="flex items-center gap-4 mb-5">
          <img
            src={userDetails.profileImage}
            alt="profile"
            className="object-cover rounded-full w-[60px] h-[60px]"
          />
          <h1 className="font-semibold font-Poppins text-[20px] lg:text-[24px] text-royal_blue dark:text-boder_blue">
            {userData.displayName}
          </h1>
        </div>
        <textarea
          className="w-full p-5 bg-slate-200 dark:bg-[#323739] outline-none rounded-2xl text-[18px] lg:text-[20px] font-Open_Sans text-black dark:text-white"
          placeholder="What's on your mind?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        ></textarea>
       
          <GrSend onClick={handlePost} className="text-[30px] text-blue cursor-pointer mt-3" />
      </div>

      {/* All Posts */}
      {posts.map((item) => (
        <div key={item.id} className="w-full p-6 bg-slate-50 dark:bg-[#252728] mb-4 rounded-2xl">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={item.profileImage}
              className="object-cover rounded-full w-[50px] h-[50px]"
              alt="user"
            />
            <h2 className="font-semibold font-Poppins text-[18px] dark:text-white">
              {item.userName}
            </h2>
          </div>
          <p className="text-[16px] font-Open_Sans text-black dark:text-white mb-3">
            {item.text}
          </p>
          <div className="flex items-center gap-4 pt-3 border-t dark:border-[#4c5050]">
            <AiOutlineLike className="text-[24px] text-blue cursor-pointer" />
            <FaRegComment className="text-[24px] text-blue cursor-pointer" />
            <BsEmojiSmileFill className="text-[24px] text-yellow-500 cursor-pointer" />
          </div>
        </div>
      ))}
    </section>
  );
};

export default Post;
