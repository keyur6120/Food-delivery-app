import React, { useEffect, useState } from "react";
import "./order.css";
import { assets } from "./../../assets/assets.js";
import { getOrders } from "../../api/index.js";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null); // Track which order is active

  const getOrderData = async () => {
    try {
      const userId = localStorage.getItem("user_Id");
      await getOrders(userId).then((response) => {
        console.log(response.data);
        setOrderData(response.data);
      });
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  console.log("orderData", orderData);

  // Hardcoded orders data for testing UI
  const hardcodedOrders = [
    {
      items: [
        { name: "Product A", quantity: 2 },
        {
          address: {
            city: "Brampton",
            state: "ON",
            ZIP: "L6Y 2L1",
            complete_address: "7 Abelard Avenue",
          },
        },
        { name: "Product B", quantity: 1 },
      ],
      amount: 50,
      status: "Shipped",
    },
    {
      items: [
        { name: "Product C", quantity: 3 },
        { name: "Product D", quantity: 2 },
      ],
      amount: 80,
      status: "In Transit",
    },
    {
      items: [{ name: "Product E", quantity: 1 }],
      amount: 20,
      status: "Delivered",
    },
  ];

  useEffect(() => {
    getOrderData();
    setData(hardcodedOrders); // Load hardcoded data for testing
  }, []);

  const toggleOrder = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the active order
  };

  return (
    <>
      <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
          {data.map((order, index) => {
            return (
              <div
                key={index}
                className={`my-orders-order ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <img src={assets.parcel_icon} alt="Parcel Icon" />
                <p>

                </p>
                <p>$.00</p>
                <p>Items: </p>
                <p>
                  <span>&#x25cf;</span>
                  <b></b>
                </p>
                <button
                  onClick={() => toggleOrder(index)} // Toggle order details visibility
                  className={activeIndex === index ? "active" : ""}
                >
                  {activeIndex === index ? "Hide Order" : "Track Order"}
                </button>
                {/* Conditionally show the order details when active */}
                <div
                  className={`order-details ${
                    activeIndex === index ? "show" : "hide"
                  }`}
                >
                  {/* Add additional details here if needed */}
                  <p>Order Details:</p>
                  <p>Shipping Date: 2023-10-05</p>
                  <p>Expected Delivery: 2023-10-10</p>
                  <p>Address:</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
