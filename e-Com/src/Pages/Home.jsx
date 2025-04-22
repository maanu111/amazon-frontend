import React from "react";
import Banner from "../app/components/home/Banner";
import Products from "../app/components/home/Products";
const Home = () => {
  return (
    <div>
      <Banner />
      <div className="w-full -mt-10 xl:-mt-36 py-10 ">
        <Products />
      </div>
    </div>
  );
};

export default Home;
