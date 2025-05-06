import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("");
  const [productPhotos, setProductPhotos] = useState([]);
  const [orders, setOrders] = useState([]);
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const aclUserData = JSON.parse(localStorage.getItem("aclUserData"));
  //
  const permissions =
    aclUserData?.role === "superadmin"
      ? ["add Product", "update Order", "inactive Product", "delete Product"]
      : user?.role === "admin" || user?.role === "editor"
      ? JSON.parse(localStorage.getItem("permissions")) || []
      : [];
  //
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [role, setRole] = useState("Admin");
  //
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorCPassword, setErrorCPassword] = useState("");
  //
  const handleName = (e) => {
    setName(e.target.value);
    setErrorName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrorEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrorPassword("");
  };
  const handleCPassword = (e) => {
    setCPassword(e.target.value);
    setErrorCPassword("");
  };
  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?]w+)*(\.\w{2,3})+$/);
  };
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
          role,
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
      setTimeout(() => {}, 3000);
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
  const isFormValid =
    productTitle.trim() !== "" &&
    productDescription.trim() !== "" &&
    productPrice.trim() !== "" &&
    productCategory.trim() !== "";
  //
  useEffect(() => {
    if (activeSection === "trackOrder") {
      fetchOrders();
    }
  }, [activeSection]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/orders/all");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setProductPhotos([file]);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (productPhotos.length > 0) {
      formData.append("image", productPhotos[0]);
      formData.append("title", productTitle);
      formData.append("description", productDescription);
      formData.append("price", productPrice);
      formData.append("category", productCategory);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/homeproducts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Product added successfully!", { icon: false });
      console.log("Product added:", response.data);

      setProductPhotos([]);
      setProductTitle("");
      setProductDescription("");
      setProductPrice("");
      setProductCategory("");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");
    }
  };
  //
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/homeproducts"
        );
        const activeOnly = response.data.filter((product) => product.isActive);
        setProducts(activeOnly);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  //

  //
  useEffect(() => {
    if (activeSection === "accessControlList") {
      fetchUsers();
    }
  }, [activeSection]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  //

  //
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center bg-[#232F3E] h-[50px] px-4">
        <button
          className="text-white md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        <h2 className="text-lg font-medium text-white ml-4">Admin Panel</h2>
      </div>

      <div className="flex flex-1">
        <div
          className={`${
            isSidebarOpen ? "absolute" : "hidden"
          } top-[50px] md:static md:block w-3/4 md:w-1/4 bg-gray-100 p-4 shadow-2xl h-full z-50 `}
        >
          <ul>
            {permissions.includes("add Product") && (
              <li
                className={`p-2 cursor-pointer rounded text-sm  ${
                  activeSection === "productsManagement"
                    ? "bg-gray-300 text-gray-800"
                    : "text-gray-600"
                }`}
                onClick={() => {
                  setActiveSection("productsManagement");
                  setIsSidebarOpen(false);
                }}
              >
                Products Management
              </li>
            )}

            {permissions.includes("update Order") && (
              <li
                className={`p-2 cursor-pointer rounded mt-1 text-sm ${
                  activeSection === "trackOrder"
                    ? "bg-gray-300 text-gray-800"
                    : "text-gray-600"
                }`}
                onClick={() => {
                  setActiveSection("trackOrder");
                  setIsSidebarOpen(false);
                }}
              >
                Track Your Order
              </li>
            )}
            {(permissions.includes("inactive Product") ||
              permissions.includes("delete Product")) && (
              <li
                className={`p-2 cursor-pointer rounded mt-2 text-sm ${
                  activeSection === "productLifecycle"
                    ? "bg-gray-300 text-gray-800"
                    : "text-gray-600"
                }`}
                onClick={() => {
                  setActiveSection("productLifecycle");
                  setIsSidebarOpen(false);
                }}
              >
                Product Lifecycle Management
              </li>
            )}

            <li
              className={`cursor-pointer italic p-4  text-gray-600  text-sm hover:underline flex justify-end  ${
                activeSection === "newAdmin"
                  ? "bg-gray-300 text-gray-800 hover:no-underline"
                  : "text-gray-600"
              }`}
              onClick={() => {
                setActiveSection("newAdmin");
                setIsSidebarOpen(false);
              }}
            >
              New User
            </li>
          </ul>
        </div>
        <div className="flex-1 p-6 bg-gray-50">
          {activeSection === "productsManagement" &&
            permissions.includes("add Product") && (
              <div>
                <h2 className="text-sm font-medium text-gray-700 mb-4">
                  Add New Product
                </h2>
                <form className="space-y-4" onSubmit={handleAddProduct}>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Product Image
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        onChange={handlePhotoUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <button
                        type="button"
                        className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded focus:outline-none focus:ring focus:ring-gray-200"
                      >
                        Upload Image
                      </button>
                    </div>
                    {productPhotos.length > 0 && (
                      <div className="mt-2 w-20 h-20 flex items-center justify-center border rounded overflow-hidden">
                        <img
                          src={URL.createObjectURL(productPhotos[0])}
                          alt="Product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter product title"
                      value={productTitle}
                      onChange={(e) => setProductTitle(e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Description
                    </label>
                    <textarea
                      placeholder="Enter product description"
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-100"
                      rows="3"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="Enter product price"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      placeholder="Enter product category"
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-100"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full py-2 rounded focus:outline-none focus:ring focus:ring-gray-200 ${
                      isFormValid
                        ? "bg-gray-300 hover:bg-gray-400 text-gray-800"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Add Product
                  </button>
                </form>
              </div>
            )}
          {activeSection === "trackOrder" && (
            <div>
              <h2 className="text-sm font-medium text-gray-700 mb-4">
                Track Your Order
              </h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-sm bg-gray-200 text-center w-1/4">
                      Customer info.
                    </th>
                    <th className="p-2 text-sm bg-gray-200 border-l border-gray-300 text-center">
                      Status
                    </th>
                    <th className="p-2 text-sm bg-gray-200 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-t border-gray-300">
                      <td className="p-2 text-xs  w-2/4">
                        <li>
                          {" "}
                          {order.name} / {order._id}
                        </li>
                      </td>
                      <td className="p-2 text-sm text-center">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            setOrders((prevOrders) =>
                              prevOrders.map((o) =>
                                o._id === order._id
                                  ? { ...o, status: e.target.value }
                                  : o
                              )
                            )
                          }
                          className="border border-gray-300 rounded p-1 text-sm bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-200 cursor-pointer"
                        >
                          <option value="Pending" className="text-yellow-500">
                            Pending
                          </option>
                          <option value="Shipped" className="text-blue-500">
                            Shipped
                          </option>
                          <option value="Delivered" className="text-green-500">
                            Delivered
                          </option>
                          <option value="Cancelled" className="text-red-500">
                            Cancelled
                          </option>
                        </select>
                      </td>
                      <td className="p-2 text-sm text-center">
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          onClick={async () => {
                            try {
                              await axios.put(
                                `http://localhost:3000/api/orders/${order._id}/status`,
                                {
                                  status: order.status,
                                }
                              );
                              toast.success(
                                "Order status updated successfully!",
                                { icon: false }
                              );
                            } catch (error) {
                              console.error(
                                "Error updating order status:",
                                error
                              );
                              toast.error("Failed to update order status.", {
                                icon: false,
                              });
                            }
                          }}
                        >
                          Continue
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeSection === "productLifecycle" && (
            <div>
              <h2 className="text-sm font-medium text-gray-700 mb-4">
                Product Lifecycle Management
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Manage the lifecycle of your products effectively.
              </p>
              <div className=" border-collapse ">
                <div className="bg-gray-200 flex items justify-between w-full text-center">
                  <span className="p-2 text-sm">Product info.</span>

                  {permissions.includes("inactive Product") ? (
                    <span className="p-2 text-sm">Product status</span>
                  ) : (
                    <span className="p-2 text-sm invisible">
                      Product status
                    </span>
                  )}

                  {permissions.includes("delete Product") ? (
                    <span className="p-2 text-sm">Remove item</span>
                  ) : (
                    <span className="p-2 text-sm invisible">Remove item</span>
                  )}
                </div>

                <div>
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="border-t  flex items-center justify-between border-gray-300 "
                    >
                      <div className="p-2 text-sm text-center w-full">
                        <div className="flex flex-col md:flex-row items-center md:justify-start gap-4">
                          {product.image && (
                            <img
                              className="w-16 h-20 object-contain rounded-md"
                              src={
                                product.image.startsWith("/uploads")
                                  ? `http://localhost:3000${product.image}`
                                  : product.image
                              }
                              alt="Product"
                            />
                          )}
                          <span className="break-all text-xs text-gray-700">
                            {product._id}
                          </span>
                        </div>
                      </div>
                      <div className="p-2 text-sm text-center w-full flex items-center gap-2">
                        {permissions.includes("inactive Product") && (
                          <label className="relative inline-flex  items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={product.isActive}
                              onChange={async () => {
                                try {
                                  const response = await axios.put(
                                    `http://localhost:3000/api/homeproducts/${product._id}`,
                                    {
                                      isActive: !product.isActive,
                                    }
                                  );

                                  setProducts((prev) =>
                                    prev.map((p) =>
                                      p._id === product._id
                                        ? { ...p, isActive: !product.isActive }
                                        : p
                                    )
                                  );

                                  toast.success("Product visibility updated");
                                } catch (err) {
                                  console.error("Failed to update", err);
                                  toast.error("Failed to update");
                                }
                              }}
                            />

                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                          </label>
                        )}
                      </div>
                      {permissions.includes("delete Product") && (
                        <div className="bg-red-500 cursor-pointer px-4 py-2 rounded-md text-white">
                          <button>Delete</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "newAdmin" && (
            <div className="w-full ">
              <div className="w-full bg-gray-100 pb-10">
                <form className="w-[350px] bg-gray-200 mx-auto flex flex-col items-center">
                  <div className="w-full  p-6">
                    <h2 className="font-titlFont text-3xl font-medium  mb-4 ">
                      Create Account
                    </h2>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col ">
                        <p className="text-xs italic font-medium">Your Name</p>
                        <input
                          onChange={handleName}
                          type="text"
                          value={name}
                          className="w-full py-1 h-[30px] px-2 text-base rounded-md outline-none "
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
                      <div className="flex flex-col ">
                        <p className="text-xs font-medium italic">Email</p>
                        <input
                          onChange={handleEmail}
                          type="email"
                          value={email}
                          className="w-full py-1 h-[30px] lowercase  rounded-md px-2 text-base outline-none "
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

                      <div className="flex flex-col ">
                        <p className="text-xs italic font-medium">Password</p>
                        <input
                          onChange={handlePassword}
                          type="password"
                          value={password}
                          className="w-full  py-1 px-2 h-[30px] text-base rounded-md outline-none "
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
                      <div className="flex flex-col ">
                        <p className="text-xs italic font-medium">
                          Re-enter Password
                        </p>
                        <input
                          onChange={handleCPassword}
                          type="password"
                          value={cPassword}
                          className="w-full  py-1  px-2 h-[30px] text-base rounded-md outline-none "
                        />
                        {errorCPassword && (
                          <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center  -mt-1.5">
                            <span className="italic font-titlFont text-base font-extrabold">
                              !
                            </span>
                            {errorCPassword}
                          </p>
                        )}
                        <p className="text-xs text-gray-600 mt-2">
                          Passwords must be atleast 6 characters
                        </p>
                        <div className="flex flex-col mt-2">
                          <p className="text-xs italic font-medium">Role</p>
                          <div className="flex items-center gap-4">
                            <label className="flex items-center text-sm">
                              <input
                                type="radio"
                                name="role"
                                value="Admin"
                                checked={role === "Admin"}
                                onChange={() => setRole("Admin")}
                                className="mr-2"
                              />
                              Admin
                            </label>
                            <label className="flex items-center text-sm">
                              <input
                                type="radio"
                                name="role"
                                value="Editor"
                                checked={role === "Editor"}
                                onChange={() => setRole("Editor")}
                                className="mr-2"
                              />
                              Editor
                            </label>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handleRegistration}
                        className="w-full py-1.5 text-sm  font-normal border border-zinc-400 rounded-lg   "
                      >
                        Create Account
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
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
      </div>
    </div>
  );
};

export default AdminPanel;
