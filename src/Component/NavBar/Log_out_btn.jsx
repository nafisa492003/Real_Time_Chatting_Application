import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Log_out_btn = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      toast.success("Successfully logged out!");
      navigate("/login"); 
    } catch (error) {
      console.error("Logout error:", error); 
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="p-5 transition-all duration-100 rounded-full text-royal_blue hover:bg-white hover:text-blue dark:text-blue"
    >
      <AiOutlineLogout className="text-[30px] md:text-[40px]" />
    </button>
  );
};

export default Log_out_btn;
