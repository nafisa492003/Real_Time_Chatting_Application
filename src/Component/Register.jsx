import React, { useState } from "react";
import reg_img from "../assets/reg_pick.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword ,sendEmailVerification } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [emailerr, setEmailerr] = useState(false);
  let [name, setName] = useState("");
  let [nameerr, setNameerr] = useState(false);
  let [password, setPassword] = useState("");
  let [passworderr, setPassworderr] = useState(false);
  let [loder, setLoder] = useState(false);
  const [hide, setHide] = useState(false);
  let handleToggle = () => {
    setHide(!hide);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailerr(true);
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailerr(true);
      setEmail("");
    }

    if (!name) {
      setNameerr(true);
      setName("");
    }

    if (!password) {
      setPassworderr(true);
      setPassword("");
    }
    if (email && name && password) {
      setLoder(true);

      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          setEmail("");
          setName("");
          setPassword("");
          sendEmailVerification(auth.currentUser)
          toast.success("Registration successfully done!");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        })
        .catch((error) => {
          setLoder(false);
          if (error.code.includes("auth/email-already-in-use")) {
            setEmailerr(true);
            toast.error("Email is already in use!");
          } else {
            toast.error("Registration failed! Try again.");
          }
        });
    
    }
  };
  return (
    <section className="flex justify-between">
     <ToastContainer position="top-center" autoClose={3000} theme="light" />
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-end mr-0 lg:mr-[69px] h-screen p-3 md:p-0">
        {/* title */}
        <div>
          <h1 className="font-nunito font-bold text-[30px] md:text-[35px] mb-2 text-royal_blue text-center lg:text-left">
            Get started with easily register
          </h1>
          <p className="font-nunito font-normal text-[21px] text-hash text-center lg:text-left">
            Free register and you can enjoy it
          </p>
          {/* title */}
          <form action="">
            <div className=" relative mt-[38px] w-full md:w-[368px]">
              <label className="font-nunito font-semibold text-[13px] text-royal_blue bg-white px-4 absolute top-[-8px] left-[40px]">
                Email Address
              </label>
              <input
                className="w-full h-[81px] rounded-lg  border-[1.72px] border-hash font-nunito font-semibold text-[21px] text-primary px-[52px] py-[26px] outline-none"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailerr(false);
                }}
                type="text"
              />
              {emailerr && (
                <>
                  <p className="text-red-600">Invalid email address</p>
                </>
              )}
            </div>
            <div className=" relative mt-[38px] w-full md:w-[368px]">
              <label className="font-nunito font-semibold text-[13px] text-royal_blue bg-white px-4 absolute top-[-8px] left-[40px]">
                Full name
              </label>
              <input
                className="w-full h-[81px] rounded-lg  border-[1.72px] border-hash font-nunito font-semibold text-[21px] text-primary px-[52px] py-[26px] outline-none"
                onChange={(e) => {
                  setName(e.target.value);
                  setNameerr(false);
                }}
                type="text"
              />
              {nameerr && (
                <>
                  <p className="text-red-600">Name field is required</p>
                </>
              )}
            </div>
            <div className=" relative mt-[38px] w-full md:w-[368px]">
              <label className="font-nunito font-semibold text-[13px] text-royal_blue bg-white px-4 absolute top-[-8px] left-[40px]">
                Password
              </label>
              <input
                className="w-full h-[81px] rounded-lg  border-[1.72px] border-hash font-nunito font-semibold text-[21px] text-primary px-[52px] py-[26px] outline-none"
                type={hide ? "text" : "password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPassworderr(false);
                }}
              />
              {hide ? (
                <FaEye
                  onClick={handleToggle}
                  size={25}
                  className="absolute top-[30px] right-[24px] cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  onClick={handleToggle}
                  size={25}
                  className="absolute top-[30px] right-[24px] cursor-pointer"
                />
              )}
              {passworderr && (
                <>
                  <p className="text-red-600">Password is required</p>
                </>
              )}
            </div>
            {loder ? (
              <button className="font-nunito font-semibold text-[21px] text-white bg-blue  rounded-[86px] mt-[40px] w-full md:w-[364px] py-5">
                Register....
              </button>
            ) : (
              <button
                className="font-nunito font-semibold text-[21px] text-white bg-blue  rounded-[86px] mt-[40px] w-full md:w-[364px] py-5"
                onClick={handleSubmit}
              >
                {" "}
                Sign up
              </button>
            )}
            <p className="font-openSans font-normal text-[13px] text-royal_blue mt-[20px] ps-[75px]">
              Already have an account ?{" "}
              <Link className="font-bold text-orange-500" to={'/login'}>Sign In</Link>
            </p>
          </form>
        </div>
      </div>
      <div className="hidden w-1/2 md:block">
        <img className="object-cover w-full h-screen" src={reg_img} alt="" />
      </div>
    </section>
  );
};

export default Register;