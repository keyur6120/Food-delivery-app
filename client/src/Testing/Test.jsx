import React, { useEffect, useState } from "react";
import "./Test.css";
import { assets } from "../assets/assets.js";

// Sample asset URL

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  // Hardcoded orders data for testing UI
  const hardcodedOrders = [
    {
        "address": {
            "city": "Brampton",
            "state": "ON",
            "ZIP": "L6Y 2L1",
            "complete_address": "7 Abelard Avenue"
        },
        "_id": "66ffeaf6c0a50a7f6e593469",
        "total_amount": 413,
        "status": "Pending",
        "products": [
            {
                "quantity": 1,
                "_id": "66ffeaf6c0a50a7f6e59346a"
            },
            {
                "quantity": 1,
                "_id": "66ffeaf6c0a50a7f6e59346b"
            },
            {
                "quantity": 1,
                "_id": "66ffeaf6c0a50a7f6e59346c"
            }
        ]
    },
    {
      "address": {
          "city": "unjha",
          "state": "gujarat",
          "ZIP": "L6Y 2L1",
          "complete_address": "14,astha bunglows,unjha"
      },
      "_id": "66ffeaf6c0a50a7f6e593469",
      "total_amount": 512,
      "status": "Pending",
      "products": [
          {
              "quantity": 5,
              "_id": "66ffeaf6c0a50a7f6e59346a"
          },
          {
              "quantity": 5,
              "_id": "66ffeaf6c0a50a7f6e59346b"
          },
          {
              "quantity": 1,
              "_id": "66ffeaf6c0a50a7f6e59346c"
          }
      ]
  }
]

  useEffect(() => {
    setData(hardcodedOrders); // Load hardcoded data for testing
  }, []);

  const toggleOrder = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the active order
  };
  console.log("data", data);
  return (
    <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
          {data.map((order, index) => {
            const totalItem =  order.products.reduce((acc, product) => acc + product.quantity, 0);
            return (
              <div
                key={index}
                className={`my-orders-order ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <img src={assets.parcel_icon} alt="Parcel Icon" />
                <p>
                {order.address.complete_address}
                </p>
                <p>${order.total_amount}</p>
                <p>Items: {totalItem}</p>
                <p>
                  <span>&#x25cf;</span>
                  <b>{order.status}</b>
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
                  <p></p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
  );
};

export default MyOrders;
