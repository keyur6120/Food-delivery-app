import React, { useState, useEffect } from "react";
import "./Orders.css";
import { getOrder, orderChanges } from "../../api/Api.js";
import { toast } from "react-toastify";
import { assets } from "../../../../client/src/assets/assets.js";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [NewOrder, setNewOrder] = useState([]);
  const [orderTime, setOrderTime] = useState(0);

  console.log(orderTime);

  const fetchAllOrders = async () => {
    const userID = "66fe34e9b09f72ec2a42e16b";
    const response = await getOrder(userID)
      .then((res) => {
        setNewOrder(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(NewOrder);

  const statusHandler = async (orderId, status, time) => {
    const response = await orderChanges(orderId, status, time)
      .then((res) => {
        toast.success("Order status updated successfully");
        if (res.data) {
          fetchAllOrders()
        }
      })
      .catch((error) => {
        console.log(error);
      });
    if (response) {
      fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [setNewOrder]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours > 0 ? hours + " hr " : ""}${minutes} min`;
  };

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {NewOrder.map((order, index) => (
          <div key={order._id} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.product_Info.map((item, index) => {
                  if (index === order.product_Info.length - 1) {
                    return item.product_name + " x " + item.quantity + " , ";
                  } else {
                    return item.product_name + " x " + item.quantity + " , ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {/* {order.address.firstName + " " + order.address.lastName} */}
              </p>
              <div className="order-item-address">
                <p>{order.address.state + ","}</p>
                <p>{order.address.complete_address}</p>
              </div>
              <p className="order-item-phone">7016261218</p>
            </div>
            <p>
              Items:
              {order.products.reduce((total, item) => total + item.quantity, 0)}
            </p>
            <p>${order.total_amount}</p>
            <select
              value={order.delivery_status || "processing"}
              onChange={(e) =>
                statusHandler(order._id, e.target.value, orderTime)
              }
            >
              <option value="processing">Processing</option>
              <option value="out for delivery">out for delivery</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="order-take-time">
              <img
                src={assets.remove_icon_red}
                alt="minus icon"
                className="order-minus-button"
                onClick={() => setOrderTime(orderTime > 0 ? orderTime - 5 : 0)}
              />
              <p>{formatTime(orderTime)}</p>
              <img
                src={assets.add_icon_green}
                alt="add icon"
                className="order-plus-button"
                onClick={() => setOrderTime(orderTime + 5)}
              />
            </div>
            <br />
            <span>
              {orderTime > 30 ? (
                <p>it's not recommand to provide much long time to customer</p>
              ) : (
                ""
              )}
            </span>
            <button onClick={() => statusHandler()}>submit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
