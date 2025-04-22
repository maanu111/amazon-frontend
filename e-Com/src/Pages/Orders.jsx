import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { emptyCart } from "../assets";
import { Link } from "react-router-dom";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f9f9f9",
      maxHeight: "calc(100vh - 100px)",
      overflowY: "auto",
    },
    ordersGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    orderCard: {
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "10px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    orderTitle: {
      marginBottom: "5px",
      color: "black",
      fontWeight: "normal",
    },
    paymentDetails: {
      marginTop: "10px",
      fontSize: "14px",
      color: "#333",
      lineHeight: "1.4",
    },
    productsHeader: {
      color: "black",
      marginBottom: "5px",
      cursor: "pointer",
    },
    productList: {
      maxHeight: "0",
      overflow: "hidden",
      transition: "max-height 0.3s ease",
      overflowY: "auto",
    },
    productListExpanded: {
      maxHeight: "200px",
    },
    productItem: {
      marginBottom: "10px",
      listStyleType: "none",
    },
    productInline: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      backgroundColor: "#f4f4f4",
      padding: "8px",
      borderRadius: "6px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    productImage: {
      width: "60px",
      height: "60px",
      objectFit: "cover",
      borderRadius: "6px",
    },
    productTitle: {
      fontSize: "12px",
      fontWeight: "bold",
      color: "#333",
      margin: "0",
    },
    highlight: {
      color: "#ff6347",
      fontWeight: "lighter",
      fontSize: "14px",
      fontFamily: "Arial, sans-serif",
    },
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/orders/my-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const toggleProducts = (orderId) => {
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  return (
    <div style={styles.container}>
      {orders.length > 0 ? (
        <div style={styles.ordersGrid}>
          {orders.map((order) => (
            <div key={order._id} style={styles.orderCard}>
              <h2 style={styles.orderTitle}>
                <strong>Order ID:</strong>{" "}
                <span style={styles.highlight}>{order._id}</span>
              </h2>
              <div style={styles.paymentDetails}>
                <p>
                  <strong>Payment Method:</strong> {order.paymentMethod}
                </p>
                <p style={{ marginTop: "10px" }}>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      color:
                        order.status === "Pending"
                          ? "orange"
                          : order.status === "Shipped"
                          ? "blue"
                          : order.status === "Delivered"
                          ? "green"
                          : order.status === "Cancelled"
                          ? "red"
                          : "black",
                    }}
                  >
                    {order.status}
                  </span>
                </p>
                <p style={{ marginTop: "10px" }}>
                  <strong>Total Price:</strong> ${" "}
                  {order.products.reduce(
                    (total, product) =>
                      total + product.price * product.quantity,
                    0
                  )}
                </p>
              </div>
              <h3
                style={styles.productsHeader}
                onClick={() => toggleProducts(order._id)}
              >
                Products {expandedOrderId === order._id ? "▲" : "▼"}
              </h3>
              <ul
                style={{
                  ...styles.productList,
                  ...(expandedOrderId === order._id &&
                    styles.productListExpanded),
                }}
              >
                {order.products.map((product) => (
                  <li key={product._id} style={styles.productItem}>
                    <div style={styles.productInline}>
                      {product.image && (
                        <img
                          src={
                            product.image.startsWith("/uploads")
                              ? `http://localhost:3000${product.image}`
                              : product.image
                          }
                          alt={product.title || "Product Image"}
                          style={styles.productImage}
                        />
                      )}
                      <p style={styles.productTitle}>
                        {product.title || "Title not available"} -
                        &nbsp;&nbsp;&nbsp;&nbsp;$ &nbsp;
                        {product.price.toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
              No Orders
            </h1>
            <p className="text-sm text-center">
              Your order list is empty, but your wishlist doesn't have to be.
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
};

export default Orders;
