import React, { useEffect, useState } from "react";
import "./order.css";
import { assets } from "../../assets/assets.js";
import { getOrders } from "../../api/index.js";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  const fetchOrders = async () => {
    const userId = localStorage.getItem("user_Id");
    try {
      const response = await getOrders(userId);
      setData(response.data);
      console.log("Orders:", response.data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
  };

  const toggleOrder = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="mo-loading">
        <h2>Loading orders...</h2>
      </div>
    );
  }

  return (
    <>
      {data.length === 0 ? (
        <div className="mo-no-order">
          <h1>No orders found</h1>
          <h3>Please place an order</h3>
        </div>
      ) : (
        <div className="mo-orders">
          <h2>My Orders</h2>
          <div className="mo-container">
            {data.map((order, index) => {
              const totalItem = order.product_Info.reduce(
                (acc, product) => acc + product.quantity,
                0
              );
              const product = order.product_Info;
              return (
                <div
                  key={index}
                  className={`mo-order ${
                    activeIndex === index ? "mo-active" : ""
                  }`}
                >
                  <div className="mo-order-summary">
                    <img src={assets.parcel_icon} alt="Parcel Icon" />
                    <p>{order.address.complete_address}</p>
                    <p>${order.total_amount}</p>
                    <p>Items: {totalItem}</p>
                    <p>
                      <span>&#x25cf;</span>
                      <b>{order.status}</b>
                    </p>
                    <button
                      onClick={() => toggleOrder(index)}
                      className={activeIndex === index ? "mo-button-active" : ""}
                    >
                      {activeIndex === index ? "Hide Order" : "Track Order"}
                    </button>
                  </div>

                  {activeIndex === index && (
                    <div className="mo-order-details mo-show">
                      <p>Order Details:</p>
                      <p>Time : {order.Time} min</p>
                      <p>Delivery status: {order.delivery_status}</p>
                      <p>Order Date: {formatDate(order.createdAt)}</p>
                      <div className="mo-order-expanded">
                        <div className="mo-product-list">
                          {product.map((items, productIndex) => (
                            <div className="mo-product-item" key={productIndex}>
                              <img
                                src={items.product_image}
                                alt={items.product_name}
                                className="mo-product-image"
                              />
                              <div className="mo-product-details">
                                <span className="mo-product-name">
                                  {items.product_name}
                                </span>
                                <span className="mo-product-quantity">1 X {items.quantity}</span>
                                <span className="mo-product-price">
                                  ${items.product_price}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default MyOrders;