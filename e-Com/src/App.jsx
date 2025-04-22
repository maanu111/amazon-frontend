import React, { useEffect } from "react";
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

const Layout = () => (
  <>
    <Header />
    <ScrollRestoration />
    <Outlet />
    <Footer />
  </>
);

function App() {
  useEffect(() => {
    const logoutTimer = setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("persist:root");
    }, 2 * 60 * 60 * 1000);

    return () => clearTimeout(logoutTimer);
  }, []);
  //
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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/acl" element={<AccessControlList />} />
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
