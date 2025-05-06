import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const location = useLocation();
  //

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    try {
      const res = await fetch("http://localhost:3000/api/users/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      });
      const data = await res.json();
      console.log("Response Data:", data);

      if (res.ok) {
        setSuccess(true);
        setError("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("An error occurred while resetting your password.");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex items-center justify-center flex-col">
        <h1 className="font-bold text-lg mb-1">Reset Password</h1>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {success && (
          <div className="text-green-500 mb-4">
            Password reset successfully! You can now log in with your new
            password.
          </div>
        )}
        <form
          className="bg-white  p-6 rounded shadow-md w-96 "
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-xs font-bold mt-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter your new password"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xs font-bold mt-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Enter your new password"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded outline-none w-full "
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
