import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {LinearProgress } from '@mui/material'
import { useDispatch } from "react-redux";
import { getCart,deleteFromCart, order } from "../../api/index.js";
import "./cart.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { ChevronDown, CreditCard, DollarSign, Truck } from "lucide-react";
import "./cart.css";
import addImage from "../../assets/add_icon_green.png";
import Minusimage from "../../assets/remove_icon_red.png";
import Alert from "@mui/material/Alert";

export default function Component() {
  const [isScheduleDelivery, setIsScheduleDelivery] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [Error, setError] = useState(false);
  const Id = localStorage.getItem('user_Id')
  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: "",
    emailAddress: "",
    phoneNumber: "",
    address: {
      City: "",
      state: "",
      ZIP: "",
      complete_address: "",
    },
  });

  const getProducts = async () => {
    const Id = localStorage.getItem("user_Id");
    try {
   await getCart({
        uid: Id,
      }).then((res) => {
        setProduct(res.data);
        setLoading(false);
      });
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateSubtotal = () => {
    const cartItem = product.reduce(
      (total, item) => total + item.quantity * item?.product?.price?.mrp,
      0
    );
    const Tax = (cartItem * 18) / 100;
    const Total = cartItem + Tax;
    return Total;
  };

  const newhandler = async () => {
    try {
      const Id = localStorage.getItem("user_Id");
      const TotalAmount = calculateSubtotal();
      const Details = {
        Username: deliveryDetails.firstName,
        total_amount: TotalAmount,
        address: {
          city: deliveryDetails.address.City,
          state: deliveryDetails.address.state,
          ZIP: deliveryDetails.address.ZIP,
          complete_address: deliveryDetails.address.complete_address,
        },
        products: product.map((item) => {
          return {
            productId: item._id,
            quantity: item.quantity,
          };
        }),
        product_Info: product.map((newItem) => {
          return {
            product_name: newItem.product.name,
            product_price: newItem.product.price.org,
            product_image: newItem.product.img,
            quantity: newItem.quantity,
          };
        }),
        user: Id,
        status: paymentMethod,
      };

      const response = await order(Details).then((res) => {
        if (paymentMethod === "online") {
          window.location.href = res.data.url;
        } else {
          toast.success("order placed",{position:'top-center'});
          setTimeout(() => {
            navigate("/orders");
          }, 5000);
        }
      });
    } catch (error) {
      console.error("Error placing order", error);
    }
  };

  const handlePlus = async (id) => {
    setProduct((prevData)=>
        prevData.map((item)=>
           item._id === id ? {...item, quantity: item.quantity + 1} : item
        )
      )
  }

  const handleMinus = async (id) => {
    setProduct((prevData)=>
      prevData.map((item)=>
        item._id === id ? {...item, quantity: item.quantity - 1} : item
      )
    )
  }

  const filterOut=async(id,quantity)=>{
    const Id = localStorage.getItem('user_Id')
    setProduct((prevData)=>
      prevData.filter((item)=> item._id !== id)
     )
     try{
       await deleteFromCart({pid:id,qun:quantity,uid:Id}).then(()=>{
         console.log('deleted')
         toast.success('product removed')
        })
      }catch(err){
        console.log(err)
      }

  }

  useEffect(() => {
    getProducts();
    newhandler();
  }, [ setProduct, buttonLoad]);

  return (
    <div className="cart-container">
      <div className="cart-grid-layout">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="cart-card"
        >
          <h2 className="cart-card-title">Delivery Information</h2>
          <form className="cart-form">
            <div className="cart-form-grid">
              <div className="cart-form-item">
                <label htmlFor="cart-name">Name</label>
                <input
                  id="cart-name"
                  placeholder="John Doe"
                  value={deliveryDetails.firstName}
                  onChange={(e) => {
                    setDeliveryDetails({
                      ...deliveryDetails,
                      firstName: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="cart-form-item">
                <label htmlFor="cart-mobile">Mobile Number</label>
                <input
                  id="cart-mobile"
                  placeholder="+91 (990) 080-0088"
                  value={deliveryDetails.phoneNumber}
                  onChange={(e) => {
                    setDeliveryDetails({
                      ...deliveryDetails,
                      phoneNumber: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="cart-form-grid">
              <div className="cart-form-item">
                <label htmlFor="cart-email">Email</label>
                <input
                  id="cart-email"
                  type="email"
                  placeholder="john@example.com"
                  value={deliveryDetails.emailAddress}
                  onChange={(e) => {
                    setDeliveryDetails({
                      ...deliveryDetails,
                      emailAddress: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="cart-form-item">
                <label htmlFor="cart-city">City</label>
                <input
                  id="cart-city"
                  placeholder="Mumbai"
                  value={deliveryDetails.address.City}
                  onChange={(e) => {
                    setDeliveryDetails({
                      ...deliveryDetails,
                      address: {
                        ...deliveryDetails.address,
                        City: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
            <div className="cart-form-grid">
              <div className="cart-form-item">
                <label htmlFor="cart-state">State</label>
                <input
                  id="cart-state"
                  placeholder="BOM"
                  value={deliveryDetails.address.state}
                  onChange={(e) => {
                    setDeliveryDetails({
                      ...deliveryDetails,
                      address: {
                        ...deliveryDetails.address,
                        state: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="cart-form-item">
                <label htmlFor="cart-zip">ZIP</label>
                <input
                  id="cart-zip"
                  placeholder="10001"
                  value={deliveryDetails.address.ZIP}
                  onChange={(e) => {
                    setDeliveryDetails({
                      ...deliveryDetails,
                      address: {
                        ...deliveryDetails.address,
                        ZIP: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
            <div className="cart-form-item">
              <label htmlFor="cart-address">Address</label>
              <input
                id="cart-address"
                placeholder="123 Main St, Apt 4B"
                value={deliveryDetails.address.complete_address}
                onChange={(e) => {
                  setDeliveryDetails({
                    ...deliveryDetails,
                    address: {
                      ...deliveryDetails.address,
                      complete_address: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="cart-flex-items-center cart-space-x-2">
              <input
                type="checkbox"
                id="cart-scheduleDelivery"
                checked={isScheduleDelivery}
                onChange={() => setIsScheduleDelivery(!isScheduleDelivery)}
                className="cart-checkbox"
              />
              <label htmlFor="cart-scheduleDelivery">Schedule Delivery</label>
            </div>
            {isScheduleDelivery && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="cart-deliveryDate">Select Delivery Date</label>
                <select id="cart-deliveryDate">
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="nextWeek">Next Week</option>
                </select>
              </motion.div>
            )}
            <div className="cart-form-item">
              <label>Payment Method</label>
              <div className="cart-icon-div">
                <input
                  type="radio"
                  id="cart-online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                />
                <label htmlFor="cart-online" className="cart-icon-label">
                  <CreditCard className="cart-icon" />
                  <span>Online Payment</span>
                </label>
              </div>
              <div className="cart-icon-div">
                <input
                  type="radio"
                  id="cart-cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                />
                <label htmlFor="cart-cash" className="cart-icon-label">
                  <DollarSign className="cart-icon" />
                  <span>Cash on Delivery</span>
                </label>
              </div>
             
            </div>
            <div className="cart-form-item">
              <label htmlFor="cart-note">Additional Notes</label>
              <textarea
                id="cart-note"
                placeholder="Any special instructions..."
              />
            </div>
            {Error ? <Alert severity="error">please fill in all</Alert> : null}
          </form>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="cart-card"
        >
          <h2 className="cart-card-title">Order Summary</h2>
            {loading? <LinearProgress  color="inherit"/>:<div className="cart-scrollable-product-list">
            {product.map((item,index) => (
              <div className="cart-product-summary" key={index}>
                <img
                  src={item?.product?.img|| item.product.image}
                  alt=""
                  className="cart-product-image"
                />

                <div className="cart-product-info">
                  <h3>{item?.product?.name}</h3>
                  <p>
                    {item?.quantity} x ${item?.product?.price?.mrp}
                  </p>
                </div>
                <div className="Cart-add-Button">
                  <img src={addImage} className="Cart-Add-item" alt="" onClick={()=>handlePlus(item._id)} />
                  <span>{item?.quantity<=0? filterOut(item._id,item.quantity):item?.quantity}</span>
                  <img src={Minusimage} alt=""  className="Cart-Minus-item" onClick={()=>handleMinus(item._id)}/>
                </div>
                <div className="cart-product-price">
                  ${(item?.quantity * item?.product?.price?.mrp).toFixed(2)}
                </div>
              </div>
            ))}
          </div>}
          

          <div className="cart-total-amount">
            <span className="cart-total">Total (+ Tax):</span>
            <span className="cart-rupees">
              ${calculateSubtotal().toFixed(2)}
            </span>
          </div>
          <button
            className="cart-confirm-button"
            onClick={() => {
              newhandler();
            }}
          >
            Confirm Order
          </button>
          <ToastContainer />
        </motion.div>
        <ToastContainer />
      </div>
    </div>
  );
}
