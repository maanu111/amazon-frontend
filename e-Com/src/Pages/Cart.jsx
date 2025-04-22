import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteItem,
  resetCart,
  decrementQuantity,
  increamentQuantity,
} from "../redux/amazonSlice";
import { emptyCart } from "../assets";

//
function Cart() {
  const products = useSelector((state) => state.amazon.products);

  const [totalPrice, setTotalPrice] = useState("0.00");
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //
  useEffect(() => {
    let Total = 0;
    products.map((item) => {
      Total += item.price * item.quantity;
      return setTotalPrice(Total.toFixed(2));
    });
  }, [products]);

  //
  return (
    <div className="w-full bg-gray-100 p-4">
      {products.length > 0 ? (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 h-auto">
          <div className="w-full h-full bg-white px-4 col-span-1 md:col-span-4">
            <div className="flex flex-col md:flex-row font-titlFont items-start md:items-center justify-between border-b-[1px] border-b-gray-400 py-3">
              <h2 className="text-2xl md:text-3xl font-medium">
                Shopping Cart
              </h2>
              <h4 className="text-lg md:text-xl font-normal">Subtitle</h4>
            </div>
            <div>
              {products.map((item) => (
                <div
                  key={item._id}
                  className="w-full border-b-[1px] border-b-gray-300 p-4 flex flex-col md:flex-row items-start md:items-center gap-4"
                >
                  <div className="w-full md:w-1/6">
                    <img
                      className="w-52 h-64 object-contain"
                      src={
                        item.image.startsWith("/uploads")
                          ? `http://localhost:3000${item.image}`
                          : item.image
                      }
                      alt="ProductImage"
                    />
                  </div>
                  <div className="w-full md:w-4/5">
                    <h2 className="font-semibold text-base md:text-lg">
                      {item.title}
                    </h2>
                    <p className="pr-0 md:pr-10 text-sm">
                      {item.description.substring(0, 200)}...
                    </p>
                    <p className="text-sm md:text-base">
                      Unit Price{" "}
                      <span className="font-semibold">${item.price}</span>
                    </p>
                    <div className="bg-[#f0f2f2] flex justify-center items-center gap-1 w-24 py-1 text-center drop-shadow-lg rounded-md">
                      <p>Qty:</p>
                      <p
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        className="cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-200"
                      >
                        -
                      </p>
                      <p>{item.quantity}</p>
                      <p
                        onClick={() => dispatch(increamentQuantity(item.id))}
                        className="cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-200"
                      >
                        +
                      </p>
                    </div>
                    <button
                      onClick={() => dispatch(deleteItem(item.id))}
                      className="bg-red-500 w-full md:w-36 py-1 rounded-lg text-white mt-2 hover:bg-red-700 active:bg-red-900 duration-200"
                    >
                      Remove
                    </button>
                  </div>
                  <div>
                    <p>${item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full py-2">
              <button
                onClick={() => dispatch(resetCart())}
                className="px-6 md:px-10 py-2 bg-red-500 hover:bg-red-600 active:bg-red-500 text-white rounded-lg font-titlFont font-semibold text-sm md:text-lg tracking-wide"
              >
                Clear Cart
              </button>
            </div>
          </div>
          <div className="w-full h-auto md:h-52 flex flex-col justify-center items-center p-4 bg-white col-span-1">
            <div>
              <p className="flex items-start gap-2 text-xs">
                <span>
                  <CheckCircleIcon className="bg-white text-green-500 rounded-full" />
                </span>{" "}
                Your order qualifies for FREE Shipping Choose this option at
                checkout. See details...
              </p>
            </div>
            <div>
              <p className="font-semibold px-4 md:px-10 py-1 flex items-center gap-2 justify-between">
                Total: <span className="text-lg font-bold">${totalPrice}</span>
              </p>
            </div>
            <button
              onClick={() => {
                navigate("/customerdetails");
              }}
              className="w-full font-titlFont font-medium text-sm md:text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-400 border-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0.5, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col md:flex-row justify-center items-center gap-4 py-10"
        >
          <div>
            <img
              className="w-60 md:w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCartimg"
            />
          </div>
          <div className="w-full md:w-96 p-4 bg-white flex flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titlFont text-lg md:text-xl font-bold">
              Your cart is No more
            </h1>
            <p className="text-sm text-center">
              Your shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/">
              <button className="mt-6 bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 px-6 md:px-8 py-2 font-titleFont font-semibold text-sm md:text-lg">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Cart;
