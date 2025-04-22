import React, { useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { logo } from "../../assets/index";
import { allItems } from "../../assets/index";
import HeaderBottom from "./HeaderBottom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [showAll, setShowAll] = useState(false);
  const products = useSelector((state) => state.amazon.products);
  const user = useSelector((state) => state.amazon.userinfo);

  return (
    <div className="w-full  sticky top-0 z-50">
      <div className="w-full text-white bg-amazon_blue  px-4 py-3 flex items-center gap-4">
        <Link to="/">
          <div className="headerhover flex items-center justify-center">
            <img src={logo} className="w-24 mt-2" alt="logo" />
          </div>
        </Link>
        <div className="headerhover hidden">
          <LocationOnOutlinedIcon />
          <p className="text-sm text-lightText font-light flex flex-col ">
            Deliver to
            <span className="text-sm font-semibold -mt-1  text-whiteText">
              India
            </span>
          </p>
        </div>
        <div className="h-10 rounded-md hidden md:flex md:justify-center flex-grow relative">
          <span
            onClick={() => setShowAll(!showAll)}
            className="w-14 h-full bg-gray-200  hover:bg-gray-300 border-2  cursor-pointer duration-300 text-amazon_blue  font-titlFont flex items-center justify-center  rounded-tl-md rounded-bl-md"
          >
            All <ArrowDropDownOutlinedIcon />
          </span>
          {showAll && (
            <div>
              <ul className="absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white border-[1px]  border-amazon_blue text-black p-2 flex-col gap-1 z-50">
                {allItems.map((item) => (
                  <li
                    key={item.id}
                    className="border-b-2 hover:border-black cursor-pointer duration-100"
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <input
            type="text"
            className="h-full text-base text-amazon_blue flex-grow outline-none border-none px-2"
          />
          <span className="flex items-center bg-yellow-400 rounded-r-md px-2">
            <SearchIcon />
          </span>
        </div>
        {user ? (
          <p className="text-sm mdl:text-xs cursor-pointer  text-white  mdl:text-lightText font-light">
            Hello, {user.name.charAt(0).toUpperCase() + user.name.slice(1)}{" "}
          </p>
        ) : (
          <Link to="/signin">
            <div className=" flex flex-col items-start justify-center headerhover">
              <p className="text-sm mdl:text-xs  text-lightText  mdl:text-lightText font-light">
                Hello, Sign In
              </p>

              <p className="text-sm font-semibold -mt-1 text-whiteText  lg:inline-flex">
                Accounts & Lists
                <span className="hidden mdl:inline-flex mdl:absolute">
                  <ArrowDropDownOutlinedIcon />
                </span>
              </p>
            </div>
          </Link>
        )}

        {user ? (
          <Link to={"/orders"}>
            <div className=" lgl:flex flex-col items-start justify-center headerhover">
              <p className="text-xs text-lightText font-light">Returns</p>
              <p className="text-sm font-semibold  -mt-1 text-whiteText">
                & Orders
              </p>
            </div>
          </Link>
        ) : (
          <Link to={"/signin"}>
            <div className=" lgl:flex flex-col items-start justify-center headerhover">
              <p className="text-xs text-lightText font-light">Returns</p>
              <p className="text-sm font-semibold  -mt-1 text-whiteText">
                & Orders
              </p>
            </div>
          </Link>
        )}
        {/*  */}
        {user ? (
          <Link to="/cart">
            <div className="flex items-start justify-center headerhover relative">
              <ShoppingCartIcon />
              <p className="text-xs font-semibold text-whiteText mt-3">
                Cart
                <span className="absolute -top-1 text-xs left-7 p-1 h-4 font-semibold bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center">
                  {products.length > 0 ? products.length : 0}
                </span>
              </p>
            </div>
          </Link>
        ) : (
          <Link to="/signin">
            <div className="flex items-start justify-center headerhover relative">
              <ShoppingCartIcon />
              <p className="text-xs font-semibold text-whiteText mt-3">
                Cart
                <span className="absolute -top-1 text-xs left-7 p-1 h-4 font-semibold bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center">
                  {products.length > 0 ? products.length : 0}
                </span>
              </p>
            </div>
          </Link>
        )}
      </div>
      <HeaderBottom />
    </div>
  );
};

export default Header;
