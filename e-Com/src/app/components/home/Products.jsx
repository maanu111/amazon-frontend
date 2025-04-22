import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import ApiIcon from "@mui/icons-material/Api";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/amazonSlice";

const Products = () => {
  const dispatch = useDispatch();
  const data = useLoaderData();
  const [productData, setProductData] = useState(data.data);

  useEffect(() => {
    const fetchMoreProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/homeproducts"
        );

        const processedProducts = response.data
          .filter((item) => item.isActive)
          .map((item) => ({
            ...item,
            image: item.image.startsWith("./")
              ? item.image.replace("./", "http://localhost:3000/")
              : item.image,
          }));

        setProductData((prevData) => {
          const existingIds = new Set(prevData.map((item) => item.id));
          const uniqueNewProducts = processedProducts.filter(
            (item) => !existingIds.has(item.id)
          );
          return [...prevData, ...uniqueNewProducts];
        });
      } catch (error) {
        console.error("Error fetching more products:", error);
      }
    };

    fetchMoreProducts();
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  gap-6 xl:gap-10 px-4">
      {productData.map((item, index) => (
        <div
          key={`${item.id}-${index}`}
          className="bg-white h-auto border-[1px] border-gray-200 py-8 z-30 hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative flex flex-col gap-4"
        >
          <div className="w-full h-auto flex items-center justify-center relative group">
            <span className="text-xs capitalize italic absolute -top-4 right-2 text-gray-500">
              {item.category}
            </span>
            <img
              className="w-52 h-64 object-contain"
              src={
                item.image.startsWith("/uploads")
                  ? `http://localhost:3000${item.image}`
                  : item.image
              }
              alt="ProductImage"
            />
            <ul className="w-full h-36 bg-gray-100 absolute bottom-[-166px]  duration-700 flex flex-col items-end justify-center gap-2 font-titlFont px-2 border-1 border-r group-hover:bottom-0">
              <li className="productLi">
                Compare
                <span>
                  <ApiIcon />
                </span>
              </li>
              <li className="productLi">
                Add to Cart
                <span>
                  <ShoppingCartIcon />
                </span>
              </li>
              <li className="productLi">
                View Details
                <span>
                  <ArrowCircleRightIcon />
                </span>
              </li>
              <li className="productLi">
                Add to Wishlist
                <span>
                  <FavoriteIcon />
                </span>
              </li>
            </ul>
          </div>
          <div className="px-4 bg-white z-10">
            <div className="flex items-center justify-between">
              <h2>{item.title.substring(0, 20)}</h2>
              <p>${item.price}</p>
            </div>
            <div>
              <p className="text-sm line-clamp-3">
                {item.description.substring(0, 300)}...
              </p>
              <div className="text-orange-300">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
            </div>
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    price: item.price,
                    category: item.category,
                    image: item.image,
                    quantity: 1,
                  })
                )
              }
              className="w-full font-titlFont  font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-400 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3 "
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
