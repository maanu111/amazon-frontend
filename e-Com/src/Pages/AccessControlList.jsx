import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccessControlList = () => {
  const [users, setUsers] = useState([]);
  //

  //

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <div className="flex items-center bg-[#232F3E] h-[50px] px-4">
        <h2 className="text-lg font-medium text-white ml-4">
          Access Control List
        </h2>
      </div>
      <div className="w-full justify-center mx-auto">
        <div className="p-4 rounded shadow-sm">
          <table className="w-full rounded-lg bg-gray-200 border-collapse">
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
                    <td className=" py-3 text-sm text-center capitalize">
                      {user.name}
                    </td>
                    <td className="p-2 text-sm text-center">{user.role}</td>
                    <td className="p-2 text-sm capitalize text-center">
                      <div className="flex flex-wrap gap-6 justify-center">
                        {[
                          "update Order",
                          "add Product",
                          "inactive Product",
                          "delete Product",
                        ].map((permission) => (
                          <label
                            key={permission}
                            className="flex items-center text-sm"
                          >
                            <input
                              type="checkbox"
                              checked={user.permissions?.includes(permission)}
                              onChange={async (e) => {
                                try {
                                  const updatedPermissions = e.target.checked
                                    ? [...(user.permissions || []), permission]
                                    : user.permissions.filter(
                                        (perm) => perm !== permission
                                      );
                                  console.log(`User ID: ${user._id}`);
                                  console.log(
                                    `Old permissions: ${user.permissions.join(
                                      ", "
                                    )}`
                                  );
                                  console.log(
                                    `Updated permissions: ${updatedPermissions.join(
                                      ", "
                                    )}`
                                  );

                                  await axios.put(
                                    `http://localhost:3000/api/users/${user._id}`,
                                    { permissions: updatedPermissions },
                                    {
                                      headers: {
                                        Authorization: `Bearer ${localStorage.getItem(
                                          "token"
                                        )}`,
                                      },
                                    }
                                  );
                                  setUsers((prev) =>
                                    prev.map((u) =>
                                      u._id === user._id
                                        ? {
                                            ...u,
                                            permissions: updatedPermissions,
                                          }
                                        : u
                                    )
                                  );

                                  //
                                  const loggedInUser = JSON.parse(
                                    localStorage.getItem("user")
                                  );
                                  if (loggedInUser._id === user._id) {
                                    const updateUser = {
                                      ...loggedInUser,
                                      permissions: updatedPermissions,
                                    };
                                    localStorage.setItem(
                                      "user",
                                      JSON.stringify(updateUser)
                                    );
                                  }
                                  // console.log(updatedPermissions);

                                  //

                                  toast.success(
                                    "Permissions updated successfully!"
                                  );
                                } catch (error) {
                                  toast.error("Failed to update permissions.");
                                }
                              }}
                              className="mr-2"
                            />
                            {permission}
                          </label>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={100}
        hideProgressBar={true}
        icon={false}
        closeButton={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable
      />
    </div>
  );
};

export default AccessControlList;
