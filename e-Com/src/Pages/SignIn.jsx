import React, { useState } from "react";
import { dark } from "../assets";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/amazonSlice";
import jwt_decode from "jwt-decode";
//
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState();
  const [errorPassword, setErrorPassword] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      return setErrorEmail("Enter your email");
    }
    if (!password) {
      return setErrorPassword("Enter your password");
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email,
          password,
        }
      );

      const { user, token } = response.data;
      console.log("User from backend:", user);
      //

      if (user?.permissions) {
        localStorage.setItem("permissions", JSON.stringify(user.permissions));
      } else {
        console.warn("Permissions missing from backend response");
      }
      //
      //
      localStorage.setItem("user", JSON.stringify(user));
      //
      console.log("updated permissions", user.permissions);
      localStorage.setItem("token", token);
      //
      const decoded = jwt_decode(token);
      console.log("magic", decoded);
      const expTime = decoded.exp * 1000;
      const currentTime = Date.now();
      const timeUntilExpiry = expTime - currentTime;
      //
      console.log("Time until expiry:", timeUntilExpiry);
      //
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(setUser(null));
      }, timeUntilExpiry);
      //
      dispatch(setUser(user));

      //

      toast.success("Welcome back!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        icon: false,
        isLoading: true,
        closeOnClick: false,
        closeButton: false,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10">
        <form className="w-[350px] mx-auto flex flex-col items-center">
          <img
            className="w-32 cursor-pointer "
            src={dark}
            alt="Logo"
            onClick={(e) => {
              navigate("/");
            }}
          />
          <div className="w-full border border-zinc-200 p-6">
            <h2 className="font-titlFont text-3xl font-medium mb-4">Sign In</h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Email</p>
                <input
                  className="w-full lowercase  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-75"
                  type="email"
                  onChange={handleEmail}
                  value={email}
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
              <Link to="/otplogin">
                <p className="hover:underline italic text-right text-xs text-blue-600">
                  Login with OTP
                </p>
              </Link>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Password</p>
                <input
                  className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-75"
                  type="password"
                  onChange={handlePassword}
                  value={password}
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
              <button
                onClick={handleLogin}
                className="w-full py-1.5 text-sm font-normal rounded-full bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400  active:border-yellow-800 active:shadow-amazonInput   "
              >
                Continue
              </button>

              {/*  */}
            </div>
            <Link to="/forgotpassword">
              {" "}
              <p className="text-xs text-blue-600 italic text-right mt-2 hover:underline cursor-pointer">
                Forgot Password ?
              </p>
            </Link>
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
            <p className="text-xs text-gray-600 mt-4 cursor-pointer group">
              <ArrowRightIcon />
              <span className="text-blue-600 group-hover:text-orange-700 hover:underline underline-offset-1">
                Need Help?
              </span>
            </p>
          </div>
          <p className="w-full text-xs text-gray-400 mt-4 flex items-center ">
            <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
            <span className="w-1/3 text-center">New to Amazon</span>
            <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
          </p>
          <Link className="w-full" to="/signup">
            <button className="w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput ">
              Create your Amazon Account
            </button>
          </Link>
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

export default SignIn;
