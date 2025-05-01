import React, { useState } from "react";
import { dark } from "../assets";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  //
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorCPassword, setErrorCPassword] = useState("");
  const navigate = useNavigate();
  //
  const handleName = (e) => {
    setName(e.target.value);
    setErrorName("");
  };
  //
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrorEmail("");
  };
  //
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrorPassword("");
  };
  //
  const handleCPassword = (e) => {
    setCPassword(e.target.value);
    setErrorCPassword("");
  };
  //
  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?]w+)*(\.\w{2,3})+$/);
  };
  //
  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!name) {
      setErrorName("Enter your name");
      return;
    }
    if (!email) {
      setErrorEmail("Enter your email");
      return;
    } else if (!emailValidation(email)) {
      setErrorEmail("Enter a valid email");
      return;
    }
    if (!password) {
      setErrorPassword("Enter your password");
      return;
    } else if (password.length < 6) {
      setErrorPassword("Password must be at least 6 characters");
      return;
    }
    if (!cPassword) {
      setErrorCPassword("Confirm your password");
      return;
    } else if (cPassword !== password) {
      setErrorCPassword("Passwords must match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        {
          name,
          email,
          password,
          cPassword,
        }
      );
      toast.success("Account created Successfully!", {
        position: "top-center",
        autoClose: "1500",
        hideProgressBar: true,
        icon: false,
        closeOnClick: false,
        closeButton: false,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/SignIn");
      }, 2000);
      setName("");
      setEmail("");
      setPassword("");
      setCPassword("");
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  //
  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10">
        <form className="w-[370px] mx-auto flex flex-col items-center">
          <img
            className="w-32 cursor-pointer"
            src={dark}
            alt="Logo"
            onClick={(e) => navigate("/")}
          />
          <div className="w-full border border-zinc-200 p-6">
            <h2 className="font-titlFont text-3xl font-medium  mb-4 ">
              Create Account
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Your Name</p>
                <input
                  onChange={handleName}
                  type="text"
                  value={name}
                  className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-75"
                />

                {errorName && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titlFont text-base font-extrabold">
                      !
                    </span>
                    {errorName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Email or phone number</p>
                <input
                  onChange={handleEmail}
                  type="email"
                  value={email}
                  className="w-full py-1 lowercase border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-75"
                />
                {errorEmail && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titlFont text-base font-extrabold">
                      !
                    </span>
                    {errorEmail}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Password</p>
                <input
                  onChange={handlePassword}
                  type="password"
                  value={password}
                  className="w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-75"
                />
                {errorPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titlFont text-base font-extrabold">
                      !
                    </span>
                    {errorPassword}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Re-enter Password</p>
                <input
                  onChange={handleCPassword}
                  type="password"
                  value={cPassword}
                  className="w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-75"
                />
                {errorCPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titlFont text-base font-extrabold">
                      !
                    </span>
                    {errorCPassword}
                  </p>
                )}
                <p className="text-xs text-gray-600">
                  Passwords must be atleast 6 characters
                </p>
              </div>
              <button
                onClick={handleRegistration}
                className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400  active:border-yellow-800 active:shadow-amazonInput   "
              >
                Continue
              </button>
            </div>
            <ToastContainer />
            <p className="text-xs text-black leading-4 mt-4">
              By Continuing, you agree to Amazon's{" "}
              <span className="text-blue-600 cursor-pointer">
                Conditions of Use{" "}
              </span>
              and{" "}
              <span className="text-blue-600 cursor-pointer">
                Privacy Notice.
              </span>
            </p>
            <div>
              <p className="text-xs text-black">
                Already have an account?{" "}
                <Link to="/signin">
                  <span className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
                    Sign in{" "}
                    <span>
                      <ArrowRightIcon />
                    </span>
                  </span>
                </Link>
              </p>
              <p className="text-xs text-black mt-2 ">
                Buying for Work?{" "}
                <span className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
                  Create a free Business account
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full bg-gradient-to-t from-white via-white to-zinc-200  flex flex-col gap-4 justify-center items-center py-10">
        <div className="flex items-center gap-6">
          <p className=" text-xs text-blue-600 group-hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Conditions of Use
          </p>
          <p className=" text-xs text-blue-600 group-hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Privacy Notice
          </p>
          <p className=" text-xs text-blue-600 group-hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Help
          </p>
        </div>
        <p className="text-xs text-gray-600">
          © 1996-2025, HimanshuThakur.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
}

export default SignUp;
