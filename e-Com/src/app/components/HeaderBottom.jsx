import React, { useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SideNavContent from "./SideNavContent";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/amazonSlice";
//
const HeaderBottom = () => {
  const user = useSelector((state) => state.amazon.userinfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebar, setSideBar] = useState(false);
  const ref = useRef();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(setUser(null));
    navigate("/signin");
  };
  return (
    <div className="w-full px-4 h-[36px] bg-amazon_light text-white flex z-50 items-center">
      <ul className="flex items-center gap-2 text-sm tracking-wide">
        <li
          onClick={() => {
            setSideBar(true);
          }}
          className="headerhover flex items-center gap-1"
        >
          <MenuIcon />
          All
        </li>
        <li className="headerhover hidden md:inline-flex">Today's Deals</li>
        <li className="headerhover hidden md:inline-flex">Customer Services</li>
        <li className="headerhover hidden md:inline-flex">Gift Cards </li>
        <li className="headerhover hidden md:inline-flex">Registry</li>
        <li className="headerhover hidden md:inline-flex">Sell</li>
      </ul>

      {sidebar && (
        <div className="w-full h-screen  text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50 ">
          <div className="w-full h-full relative">
            <motion.div
              ref={ref}
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-[80%] md:w-[350px] h-full bg-white border border-black overflow-y-scroll"
            >
              <div className="w-full bg-amazon_light text-white py-2 px-6 flex items-center gap-4 ">
                <AccountCircleIcon />
                <h3 className="font-titlFont font-bold text-lg tracking-wide">
                  Hello,{" "}
                  {user
                    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
                    : "Guest"}
                </h3>
              </div>
              <SideNavContent
                title=" Trending Now"
                one=" Bestsellers"
                two=" New Releases"
                three=" Movers and Shakers"
              />
              <SideNavContent
                title=" Digital Content and Devices"
                one="Amazon miniTV- FREE entertainment"
                two=" Echo and Alexa"
                three="Fire TV"
              />
              <SideNavContent
                title="Shop by Category"
                one=" Mobile, Computers"
                two="TV, Appliances, Electronics"
                three="Men's Fashion"
              />
              <SideNavContent
                title="Programs & Features"
                one="Amazon Pay"
                two="Gift Cards & Mobile Recharges"
                three="Amazon Launchpad"
              />
              <SideNavContent
                title="Help & Settings"
                one="Your Account"
                two="Customer Care"
                three="Sign Out"
                onClickThree={handleLogout}
              />
              <span
                onClick={() => setSideBar(false)}
                className="cursor-pointer absolute top-0 left-[82%] md:left-[360px] w-10 h-10  text-black flex items-center  justify-center border bg-gray-200 hover:bg-red-500 hover:text-white duration-200"
              >
                <CloseIcon />
              </span>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderBottom;
