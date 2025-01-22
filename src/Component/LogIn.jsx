import React, { useState } from "react";
import log_in_pick from "../assets/log_in_pick.png";
import google from "../assets/google_pick.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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
  const [loader, setLoader] = useState(false);

  const handleToggle = () => setHide(!hide);

  const handlegoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const db = getDatabase();
        const userId = user.uid;
        const userRef = ref(db, `users/${userId}`);
  
        const profile_img_placeholder = "https://example.com/default-profile-img.png"; // Replace with a real URL
        const default_name = "Anonymous User";
  
        get(userRef)
          .then((snapshot) => {
            if (!snapshot.exists()) {
              // Save user data if not already present
              set(userRef, {
                name: user.displayName || default_name, // Use fallback if displayName is null
                email: user.email,
                profileImage: user.photoURL || profile_img_placeholder, // Fallback if photoURL is null
                createdAt: new Date().toISOString(), // Track when the user was created
              })
                .then(() => {
                  toast.success("Google login successful!");
                  dispatch(
                    login({
                      uid: user.uid,
                      displayName: user.displayName || default_name,
                      email: user.email,
                      photoURL: user.photoURL || profile_img_placeholder,
                    })
                  );
                  // Redirect to home after a short delay
                  setTimeout(() => {
                    navigate("/");
                  }, 2000);
                })
                .catch((error) => {
                  console.error("Error saving user data:", error);
                  toast.error("Failed to save user data.");
                });
            } else {
              // If user data already exists
              const existingUser = snapshot.val();
  
              // Ensure that the user data is up to date (e.g., in case of updated Google profile)
              const updatedUserData = {
                name: existingUser.name || user.displayName || default_name,
                email: user.email,
                profileImage: existingUser.profileImage || user.photoURL || profile_img_placeholder,
              };
  
              update(userRef, updatedUserData)
                .then(() => {
                  toast.success("Google login successful!");
                  dispatch(
                    login({
                      uid: user.uid,
                      displayName: updatedUserData.name,
                      email: updatedUserData.email,
                      photoURL: updatedUserData.profileImage,
                    })
                  );
                  // Redirect to home after a short delay
                  setTimeout(() => {
                    navigate("/");
                  }, 2000);
                })
                .catch((error) => {
                  console.error("Error updating user data:", error);
                  toast.error("Failed to update user data.");
                });
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            toast.error("Failed to fetch user data. Please try again.");
          });
      })
      .catch((error) => {
        console.error("Google login failed:", error.message);
        toast.error("Google login failed. Please try again.");
      });
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailerr(true);
    } else {
      setEmailerr(false);
    }

    if (!password) {
      setPassworderr(true);
    } else {
      setPassworderr(false);
    }

    if (email && password) {
      setLoader(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const db = getDatabase();
          const userRef = ref(db, `users/${user.uid}`);
          get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
              dispatch(
                login({
                  uid: user.uid,
                  displayName: snapshot.val().name,
                  email: snapshot.val().email,
                  photoURL: snapshot.val().profileImage,
                })
              );
              toast.success("Login successful!");
              setTimeout(() => navigate("/"), 2000);
            } else {
              toast.error("User not found in database.");
            }
          });
        })
        .catch((error) => {
          setLoader(false);
          toast.error("Invalid credentials. Try again!");
        });
    }
  };

  return (
    <section className="flex justify-between">
      <ToastContainer position="top-center" autoClose={3000} theme="light" />
      <div className="flex flex-col items-center justify-center w-full h-screen p-3 lg:w-1/2 md:p-0">
        <div>
          <h1 className="font-nunito font-bold text-[30px] md:text-[35px] mb-2 text-royal_blue text-center lg:text-left">
            Welcome back
          </h1>
          <button onClick={handlegoogle} className="bg-white py-[20px] px-[26px] rounded-lg w-[368px] flex justify-center items-center mt-[40px] border-2 border-[#ddd]">
            <img src={google} alt="google" className="w-[25px]" />
            <p className="text-[21px] text-royal_blue font-nunito font-semibold ml-[20px]">Sign In with Google</p>
          </button>
          <form>
            <div className="relative mt-[38px] w-full md:w-[368px]">
              <label className="font-nunito font-semibold text-[13px] text-royal_blue bg-white px-4 absolute top-[-8px] left-[40px]">Email Address</label>
              <input
                className="w-full h-[81px] rounded-lg border-[1.72px] border-hash font-nunito font-semibold text-[21px] text-primary px-[52px] py-[26px] outline-none"
                type="email"
                onChange={(e) => { setEmail(e.target.value); setEmailerr(false); }}
              />
              {emailerr && <p className="text-red-600">Invalid email address</p>}
            </div>
            <div className="relative mt-[38px] w-full md:w-[368px]">
              <label className="font-nunito font-semibold text-[13px] text-royal_blue bg-white px-4 absolute top-[-8px] left-[40px]">Password</label>
              <input
                className="w-full h-[81px] rounded-lg border-[1.72px] border-hash font-nunito font-semibold text-[21px] text-primary px-[52px] py-[26px] outline-none"
                type={hide ? "text" : "password"}
                onChange={(e) => { setPassword(e.target.value); setPassworderr(false); }}
              />
              {hide ? (
                <FaEye onClick={handleToggle} size={25} className="absolute top-[30px] right-[24px] cursor-pointer" />
              ) : (
                <FaEyeSlash onClick={handleToggle} size={25} className="absolute top-[30px] right-[24px] cursor-pointer" />
              )}
              {passworderr && <p className="text-red-600">Password is required</p>}
            </div>
            {loader ? (
              <button className="font-nunito font-semibold text-[21px] text-white bg-blue rounded-[86px] mt-[40px] w-full md:w-[364px] py-5">Login....</button>
            ) : (
              <button onClick={handleSubmit} className="font-nunito font-semibold text-[21px] text-white bg-blue rounded-[86px] mt-[40px] w-full md:w-[364px] py-5">
                Sign In
              </button>
            )}
            <p className="font-openSans font-normal text-[13px] text-royal_blue mt-[20px] ps-[75px]">
              Don't have an account? <Link className="font-bold text-orange-500" to="/register">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
      <div className="hidden w-1/2 md:block">
        <img className="object-cover w-full h-screen" src={log_in_pick} alt="" />
      </div>
    </section>
  );
};

export default LogIn;