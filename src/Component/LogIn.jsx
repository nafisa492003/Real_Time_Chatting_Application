import React, { useState } from "react";
import log_in_pick from "../assets/log_in_pick.png";
import google from "../assets/google_pick.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { ref, get, set, getDatabase } from "firebase/database"; // Added imports for Realtime Database
import { useDispatch } from "react-redux";
import { login } from "./Slices/userSlice";

const LogIn = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailerr, setEmailerr] = useState(false);
  const [password, setPassword] = useState("");
  const [passworderr, setPassworderr] = useState(false);
  const [hide, setHide] = useState(true);
  const [loder, setLoder] = useState(false);

  const handleToggle = () => {
    setHide(!hide);
  };

  const handlegoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Google login successful:", user);
        const db = getDatabase(); 
        const userId = user.uid;
        const userRef = ref(db, `users/${userId}`);
        const profile_img_placeholder = "https://example.com/default-profile-img.png"; 
        get(userRef).then((snapshot) => {
          if (!snapshot.exists()) {
            set(userRef, {
              name: user.displayName,
              email: user.email,
              profileImage: user.photoURL || profile_img_placeholder,
            })
              .then(() => {
                console.log("User data saved to Firebase");
                toast.success("Google login successful!");
                dispatch(
                  login({
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                  })
                );
                setTimeout(() => {
                  navigate("/"); // Navigate to home page after login
                }, 2000);
              })
              .catch((error) => {
                console.error("Error saving user data to Firebase:", error);
                toast.error("Failed to save user data. Please try again.");
              });
          } else {
            // If user exists, proceed without saving
            toast.success("Google login successful!");
            dispatch(
              login({
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
              })
            );
            setTimeout(() => {
              navigate("/"); // Navigate to home page after login
            }, 2000);
          }
        });
      })
      .catch((error) => {
        console.error("Google login failed:", error.message);
        toast.error("Google login failed. Please try again.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailerr(true);
      setEmail("");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailerr(true);
      setEmail("");
    }
    if (!password) {
      setPassworderr(true);
      setPassword("");
    }
    if (email && password) {
      setLoder(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(
            login({
              uid: user.uid,
              email: user.email,
            })
          );
          setEmail("");
          setPassword("");
          toast.success("Login successfully done!");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          setLoder(false);
          if (error) {
            setEmailerr(true);
            toast.error("Login failed! Try again.");
          }
        });
    }
  };

  return (
    <section className="flex justify-between">
      <ToastContainer position="top-center" autoClose={3000} theme="light" />
      <div className="flex flex-col items-center justify-center w-full h-screen p-3 lg:w-1/2 md:p-0">
        {/* title */}
        <div>
          <h1 className="font-nunito font-bold text-[30px] md:text-[35px] mb-2 text-royal_blue text-center lg:text-left">
            Login to your account!
          </h1>
          <div
            onClick={handlegoogle}
            className="flex gap-3 w-[220px] p-5 border-[1.72px] border-bad mb-3 cursor-pointer"
          >
            <img src={google} alt="" />
            <h5 className="text-sm font-semibold font-Open_Sans text-royal_blue">
              Login with Google
            </h5>
          </div>
          {/* title */}
          <form action="">
            <div className=" relative mt-[62px]">
              <label className="font-nunito font-semibold text-[13px] text-hash bg-white px-4 absolute top-[-8px] left-[0px]">
                Email Addres
              </label>
              <input
                className="w-full md:w-[368px] border-b-[1.72px] border-boder_blue font-nunito font-semibold text-[21px] text-royal_blue px-[22px] py-[20px] outline-none"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailerr(false);
                }}
                type="text"
              />
              {emailerr && (
                <>
                  <p className="text-red-600">
                    Please enter your correct email
                  </p>
                </>
              )}
            </div>
            <div className=" relative mt-[62px]">
              <label className="font-nunito font-semibold text-[13px] text-hash bg-white px-4 absolute top-[-8px] left-[0px]">
                Password
              </label>
              <input
                className="w-full md:w-[368px] border-b-[1.72px] border-hash font-nunito font-semibold text-[21px] text-royal_blue px-[22px] py-[20px] outline-none"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPassworderr(false);
                }}
                type={hide ? "password" : "text"}
              />
              {hide ? (
                <FaEyeSlash
                  onClick={handleToggle}
                  size={25}
                  className="absolute top-[30px] right-[24px]  cursor-pointer"
                />
              ) : (
                <FaEye
                  onClick={handleToggle}
                  size={25}
                  className="absolute top-[30px] right-[24px]  cursor-pointer"
                />
              )}
              {passworderr && (
                <>
                  <p className="text-red-600">Password field is empty</p>
                </>
              )}
            </div>
            {loder ? (
              <></>
            ) : (
              <button
                onClick={handleSubmit}
                className="font-nunito font-semibold text-[21px] text-white bg-blue w-full md:w-[368px] py-[20px] rounded mt-[51px] text-center shadow-xl"
              >
                Login to Continue
              </button>
            )}

            <p className="font-openSans font-normal text-[13px] text-royal_blue mt-[20px] ps-[75px]">
              Already have an account ?{" "}
              <Link className="font-bold text-orange-500" to={"/register"}>
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="hidden w-1/2 md:block">
        <img
          className="object-cover w-full h-screen"
          src={log_in_pick}
          alt=""
        />
      </div>
    </section>
  );
};

export default LogIn;