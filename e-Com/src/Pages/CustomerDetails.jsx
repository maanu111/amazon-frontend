import React from "react";
import { useDispatch } from "react-redux";
import { resetCart, placeOrder } from "../redux/amazonSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const CustomerDetails = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [landmark, setLandmark] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.amazon.products);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !email.trim() ||
      !mobile.trim() ||
      !address.trim() ||
      !city.trim() ||
      !district.trim() ||
      !landmark.trim() ||
      !paymentMethod ||
      cartItems.length === 0
    ) {
      alert("All fields and cart items are required!");
      return;
    }

    const orderData = {
      name,
      email,
      mobile,
      address,
      city,
      district,
      landmark,
      paymentMethod,
      status: "Pending",
      products: cartItems,
    };

    try {
      const token = localStorage.getItem("token");
      // console.log("Token:", localStorage.getItem("token"));

      await axios.post("http://localhost:3000/api/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(placeOrder(orderData));
      dispatch(resetCart());
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };
  toast.success("Account created Successfully!", {
    position: "top-center",
    autoClose: "1000",
    hideProgressBar: true,
    icon: false,
    closeOnClick: false,
    closeButton: false,
    pauseOnHover: false,
    draggable: true,
    theme: "light",
  });
  return (
    <div className="w-full flex justify-center items-center bg-gray-100 p-4">
      <div className="relative w-full md:w-4/5 lg:w-3/5 mt-4">
        <div className="w-full mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">
            Customer Details
          </h3>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-300 pt-2"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              required
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="email"
              required
              placeholder="Your Email Address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              required
              placeholder="Mobile Number"
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <textarea
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 md:col-span-2"
              rows="3"
            ></textarea>
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              required
              placeholder="City"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              required
              placeholder="District"
              onChange={(e) => setDistrict(e.target.value)}
              value={district}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              placeholder="Landmark"
              onChange={(e) => setLandmark(e.target.value)}
              value={landmark}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 md:col-span-2"
            />
            <div className="md:col-span-2">
              <h3 className="text-lg md:text-xl font-semibold mb-2 mt-4">
                Payment Method
              </h3>
              <div className="rounded border-t border-gray-200 pt-2">
                <label className="block mb-2">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  Cash on Delivery
                </label>
                <label className="block">
                  <input
                    type="radio"
                    name="payment"
                    value="gpay"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  Google Pay
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-white font-semibold py-2 rounded-md md:col-span-2"
            >
              Place Order
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
