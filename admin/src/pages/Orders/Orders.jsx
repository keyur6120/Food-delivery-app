import React, { useState, useEffect } from "react";
import "./Orders.css";
import { getOrder, orderChanges } from "../../api/Api.js";
import { toast } from "react-toastify";
import { assets } from "../../../../client/src/assets/assets.js";
import { useLocation } from "react-router-dom";
import { getID } from "../../Redux/reducers/userSlice.js";
import { useDispatch,useSelector } from "react-redux";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const [NewOrder, setNewOrder] = useState([]);

  const [orderTimes, setOrderTimes] = useState({});

  const Location = useLocation();

  const getuserId = new URLSearchParams(Location.search).get("userId");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getID({ user: getuserId,myname:"admin" }));
  }, [getuserId]);

  const user = useSelector((state) => state.user.currentUser);
  console.log(user);

  const fetchAllOrders = async () => {
    try {
      const response = await getOrder(user);
      setNewOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler = async (orderId, status, time) => {
    try {
      const response = await orderChanges(orderId, status, time);
      toast.success("Order status updated successfully");
      if (response.data) {
        fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours > 0 ? hours + " hr " : ""}${minutes} min`;
  };

  const handleTimeChange = (orderId, delta) => {
    setOrderTimes((prevTimes) => {
      const newTime = (prevTimes[orderId] || 0) + delta;

      if (newTime < 0) {
        return prevTimes;
      }

      return {
        ...prevTimes,
        [orderId]: newTime,
      };
    });
  };

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {NewOrder.map((order) => (
          <div key={order._id} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.product_Info.map(
                  (item, index) =>
                    item.product_name + " x " + item.quantity + " , "
                )}
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
                statusHandler(order._id, e.target.value, orderTimes[order._id])
              }
            >
              <option value="processing">Processing</option>
              <option value="out for delivery">Out for delivery</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="order-take-time">
              <img
                src={assets.remove_icon_red}
                alt="minus icon"
                className="order-minus-button"
                onClick={() => handleTimeChange(order._id, -5)}
              />
              <p>{formatTime(orderTimes[order._id] || 0)}</p>
              <img
                src={assets.add_icon_green}
                alt="add icon"
                className="order-plus-button"
                onClick={() => handleTimeChange(order._id, 5)}
              />
            </div>
            <br />
            {orderTimes[order._id] > 30 && (
              <p>
                It's not recommended to provide such a long time to the customer
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
