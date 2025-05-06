import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./app/components/footer/Footer";
import Header from "./app/components/Header";
import Home from "./Pages/Home";
import { productData } from "./api/api";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Cart from "./Pages/Cart";
import CustomerDetails from "./Pages/CustomerDetails";
import Orders from "./Pages/Orders";
import AdminPanel from "./Pages/AdminPanel";
import AccessControlList from "./Pages/AccessControlList";
import OtpLogin from "./Pages/OtpLogin";
import jwt_decode from "jwt-decode";
import { setUser } from "./redux/amazonSlice";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import CustomerAnalytics from "./Pages/CustomerAnalytics";
const Layout = () => (
  <>
    <Header />
    <ScrollRestoration />
    <Outlet />
    <Footer />
  </>
);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.clear();
        dispatch(setUser(null));
      }
    }
  }, []);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} loader={productData} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/customerdetails" element={<CustomerDetails />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/otplogin" element={<OtpLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/acl" element={<AccessControlList />} />
        <Route path="/customeranalytics" element={<CustomerAnalytics />} />
      </>
    )
  );

  return (
    <div className="font-bodyFont bg-gray-100">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
