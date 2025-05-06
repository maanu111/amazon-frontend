import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccessControlList = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state

  useEffect(() => {
    const aclUserData = JSON.parse(localStorage.getItem("aclUserData"));
    if (aclUserData && aclUserData.role === "superadmin") {
      setIsLoggedIn(true);
      setRole(aclUserData.role);
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setUsers(response.data);
    } catch (error) {
      toast.error("Error fetching users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        { email, password }
      );
      const { token, user } = response.data;
      localStorage.setItem("aclToken", token);
      localStorage.setItem("aclUserData", JSON.stringify(user));
      setIsLoggedIn(true);
      setRole(user.role);
      fetchUsers();
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("aclToken");
    localStorage.removeItem("aclUserData");
    setIsLoggedIn(false);
    setRole(null);
  };

  const handlePermissionChange = async (user, permission, isChecked) => {
    try {
      const updatedPermissions = isChecked
        ? [...(user.permissions || []), permission]
        : user.permissions.filter((perm) => perm !== permission);

      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, permissions: updatedPermissions } : u
        )
      );
      localStorage.setItem("permissions", JSON.stringify(updatedPermissions));

      const loggedInUser = JSON.parse(localStorage.getItem("aclUserData"));
      if (loggedInUser._id === user._id) {
        const updatedUser = {
          ...loggedInUser,
          permissions: updatedPermissions,
        };
        localStorage.setItem("aclUserData", JSON.stringify(updatedUser));
      }

      await axios.put(
        `http://localhost:3000/api/users/${user._id}`,
        { permissions: updatedPermissions },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("aclToken")}`,
          },
        }
      );

      toast.success("Permissions updated successfully!");
    } catch (error) {
      toast.error("Failed to update permissions.");
    }
  };

  const PermissionCheckboxes = ({ user }) => (
    <div className="flex flex-wrap gap-6 justify-center">
      {[
        "update Order",
        "add Product",
        "inactive Product",
        "delete Product",
      ].map((permission) => (
        <label key={permission} className="flex items-center text-sm">
          <input
            type="checkbox"
            checked={user.permissions?.includes(permission)}
            onChange={(e) =>
              handlePermissionChange(user, permission, e.target.checked)
            }
            className="mr-2"
          />
          {permission}
        </label>
      ))}
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        <div className="p-4 rounded shadow-md w-96 bg-white">
          <h2 className="text-lg font-medium text-center mb-4">
            Super-Admin Login
          </h2>
          <input
            type="email"
            className="w-full mb-4 p-2 border text-sm border-gray-300 outline-none rounded"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full mb-4 p-2 border text-sm border-gray-300 outline-none rounded"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full p-2 text-sm bg-blue-500 active:bg-blue-400 text-white rounded"
            disabled={loading} // Disable during loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    );
  }

  if (role !== "superadmin") {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-600">
        Access Denied: Super-Admins Only
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="flex items-center bg-[#232F3E] h-[50px] px-4">
          <h2 className="text-lg font-medium text-white ml-4">
            Access Control List
          </h2>
          <button
            onClick={handleLogout}
            className="ml-auto p-2 text-white bg-red-500 rounded"
          >
            Logout
          </button>
        </div>
        <div className="w-full justify-center mx-auto">
          <div className="p-4 rounded shadow-sm">
            <table className="w-full rounded-lg bg-gray-200 border-collapse hidden md:table">
              <thead>
                <tr className="bg-gray-300">
                  <th className="p-2 text-sm text-center">User</th>
                  <th className="p-2 text-sm text-center">Roles</th>
                  <th className="p-2 text-sm text-center">Permissions</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter(
                    (user) => user.role === "admin" || user.role === "editor"
                  )
                  .map((user) => (
                    <tr key={user._id}>
                      <td className="py-3 text-sm text-center capitalize">
                        {user.name}
                      </td>
                      <td className="p-2 text-sm text-center">{user.role}</td>
                      <td className="p-2 text-sm capitalize text-center">
                        <PermissionCheckboxes user={user} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="block md:hidden">
              {users
                .filter(
                  (user) => user.role === "admin" || user.role === "editor"
                )
                .map((user) => (
                  <div
                    key={user._id}
                    className="mb-4 p-4 bg-gray-200 rounded-lg shadow-sm"
                  >
                    <div className="mb-2">
                      <strong>User:</strong> {user.name}
                    </div>
                    <div className="mb-2">
                      <strong>Role:</strong> {user.role}
                    </div>
                    <div>
                      <strong>Permissions:</strong>
                      <PermissionCheckboxes user={user} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AccessControlList;
