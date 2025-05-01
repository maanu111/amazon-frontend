import React, { useState } from "react";
import { dark } from "../assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { setUser } from "../redux/amazonSlice";
import { Icon } from "@mui/material";

const OtpLogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrorEmail("");
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return setErrorEmail("Enter your email");

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/users/sendOtp",
        { email }
      );
      toast.success(response.data.message);
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return toast.error("Enter the OTP");

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/users/verifyOtp",
        { email, otp }
      );
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser(user));

      toast.success("Login Successful");

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10">
        <form className="w-[350px] mx-auto flex flex-col items-center">
          <img
            className="w-32 cursor-pointer"
            src={dark}
            alt="Logo"
            onClick={() => navigate("/")}
          />
          <div className="w-full border border-zinc-200 p-6">
            <h2 className="font-titlFont text-3xl font-medium mb-4">Sign In</h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Email</p>
                <input
                  className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-75"
                  type="email"
                  onChange={handleEmail}
                  value={email}
                  disabled={step === 2}
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

              {step === 2 && (
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Enter OTP</p>
                  <input
                    className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-75"
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              )}

              <button
                onClick={step === 1 ? handleSendOtp : handleVerifyOtp}
                disabled={loading}
                className="w-full py-1.5 text-sm font-normal rounded-full bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
              >
                {loading
                  ? "Processing..."
                  : step === 1
                  ? "Send OTP"
                  : "Verify OTP & Login"}
              </button>
            </div>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpLogin;
