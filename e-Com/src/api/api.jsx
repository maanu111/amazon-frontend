import axios from "axios";
import React from "react";
export async function productData() {
  const products = axios.get("https://fakestoreapi.com/products");
  return products;
}
