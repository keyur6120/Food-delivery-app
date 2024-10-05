import React, { useEffect, useState } from "react";
import "./order.css";
import { assets } from "../../assets/assets.js";
import { getOrders } from "../../api/index.js";

// Sample asset URL

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  // Hardcoded orders data for testing UI
  const hardcodedOrders = [
    {
      address: {
        city: "Brampton",
        state: "ON",
        ZIP: "L6Y 2L1",
        complete_address: "7 Abelard Avenue",
      },
      _id: "66ffeaf6c0a50a7f6e593469",
      total_amount: 413,
      status: "Pending",
      products: [
        {
          quantity: 1,
          _id: "66ffeaf6c0a50a7f6e59346a",
        },
        {
          quantity: 1,
          _id: "66ffeaf6c0a50a7f6e59346b",
        },
        {
          quantity: 1,
          _id: "66ffeaf6c0a50a7f6e59346c",
        },
      ],
      createdAt: "2024-10-04T13:17:42.767Z",
      updatedAt: "2024-10-04T13:17:42.767Z",
    },
    {
      address: {
        city: "unjha",
        state: "Gujarat",
        ZIP: "384170",
        complete_address: "14,astha bunglow,unjha",
      },
      _id: "66fff07bc0a50a7f6e593bd5",
      total_amount: 306.8,
      status: "cash on delivery",
      products: [
        {
          quantity: 1,
          _id: "66fff07bc0a50a7f6e593bd6",
        },
        {
          quantity: 1,
          _id: "66fff07bc0a50a7f6e593bd7",
        },
      ],
      createdAt: "2024-10-04T13:41:15.716Z",
      updatedAt: "2024-10-04T13:41:15.716Z",
    },
    {
      address: {
        city: "Brampton",
        state: "ON",
        ZIP: "L6Y 2L1",
        complete_address: "7 Abelard Avenue",
      },
      _id: "66fff0b8c0a50a7f6e593dec",
      total_amount: 330.4,
      status: "cash",
      products: [
        {
          quantity: 1,
          _id: "66fff0b8c0a50a7f6e593ded",
        },
        {
          quantity: 1,
          _id: "66fff0b8c0a50a7f6e593dee",
        },
      ],
      createdAt: "2024-10-04T13:42:16.989Z",
      updatedAt: "2024-10-04T13:42:16.989Z",
    },
  ];
  // user Order data
  const fetchOrders = async () => {
    const userId = localStorage.getItem("user_Id");
    try {
      await getOrders(userId).then((response) => {
        setData(response.data);
      });
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };
  
  useEffect(() => {
    fetchOrders();
    console.log('data is inserted')
  }, [setData]);

  const formmateDate = (date) => {
    const d = new Date(date);
    return `${d.getDay()}-${d.getMonth()}-${d.getFullYear()}`;
  };

  const toggleOrder = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the active order
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          const totalItem = order.products.reduce(
            (acc, product) => acc + product.quantity,
            0
          );
          return (
            <div
              key={index}
              className={`my-orders-order ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <p>{order.address.complete_address}</p>
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
                <p>Order Date:{formmateDate(order.createdAt)}</p>
                <p></p>
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
