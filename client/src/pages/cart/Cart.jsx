import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/reducers/SnackbarSlice.js";
import { getCart, addToCart, deleteFromCart, order } from "../../api/index.js";
import "./cart.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { ChevronDown, CreditCard, DollarSign, Truck } from "lucide-react";
import "./cart.css";
import Alert from "@mui/material/Alert";

export default function Component() {
  const [isScheduleDelivery, setIsScheduleDelivery] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [product, setProduct] = useState([]);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [Error, setError] = useState(false);
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

  // done working
  const getProducts = async () => {
    const Id = localStorage.getItem("user_Id");
    try {
      const res = await getCart({
        uid: Id,
      }).then((res) => {
        console.log("console from cart compo getProducts method", res.data);
        setProduct(res.data);
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateSubtotal = () => {
    const cartItem = product.reduce(
      (total, item) => total + item.quantity * item?.product?.price?.org,
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
          toast.success("order placed");
          // navigate("/orders");
          setTimeout(() => {
            navigate("/orders");
          }, 8000);
        }
      });
    } catch (error) {
      console.error("Error placing order", error);
    }
  };

  //done
  // const addCart = async (id) => {
  //   const userId = localStorage.getItem("user_Id");
  //   try {
  //     await addToCart({ pid: id, uid: userId, qun: 1 });

  //     setProduct((prevProducts) =>
  //       prevProducts.map((item) =>
  //         item.product._id === id
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       )
  //     );

  //     dispatch(
  //       openSnackbar({
  //         message: "Product quantity increased",
  //         severity: "success",
  //       })
  //     );
  //   } catch (err) {
  //     dispatch(
  //       openSnackbar({
  //         message: err.message,
  //         severity: "error",
  //       })
  //     );
  //   }
  // };

  //working
  // const removeCart = async (id, quantity, type) => {
  //   const userId = localStorage.getItem("user_Id");
  //   let qnt = quantity > 0 ? 1 : null;
  //   if (type === "full") qnt = null;

  //   try {
  //     await deleteFromCart({ pid: id, qun: qnt, uid: userId });

  //     if (type === "full") {
  //       setProduct((prevProducts) =>
  //         prevProducts.filter((item) => item.product._id !== id)
  //       );
  //     } else {
  //       setProduct((prevProducts) =>
  //         prevProducts.map((item) =>
  //           item.product._id === id
  //             ? { ...item, quantity: item.quantity - 1 }
  //             : item
  //         )
  //       );
  //     }

  //     dispatch(
  //       openSnackbar({
  //         message: "Product quantity decreased",
  //         severity: "success",
  //       })
  //     );
  //   } catch (err) {
  //     dispatch(
  //       openSnackbar({
  //         message: err.message,
  //         severity: "error",
  //       })
  //     );
  //   }
  // };

  useEffect(() => {
    getProducts();
    newhandler();
  }, [reload, setProduct, buttonLoad]);

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
    product_Info: product.map((item) => {
      return {
        product_name: item.product.name,
        product_price: item.product.price.org,
        product_image: item.product.img,
      };
    }),
    user: Id,
    status: paymentMethod,
  };
  console.log(Details);

  const data = product.map((item) => {
    return {
      product_name: item.product.name,
      product_price: item.product.price.org,
      product_image: item.product.img,
    };
  });

  return (
    <div className="container">
      <div className="grid-layout">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <h2 className="card-title">Delivery Information</h2>
          <form className="form">
            <div className="form-grid">
              <div className="form-item">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
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
              <div className="form-item">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  id="mobile"
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
            <div className="form-grid">
              <div className="form-item">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
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
              <div className="form-item">
                <label htmlFor="city">City</label>
                <input
                  id="city"
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
            <div className="form-grid">
              <div className="form-item">
                <label htmlFor="state">State</label>
                <input
                  id="state"
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
              <div className="form-item">
                <label htmlFor="zip">ZIP</label>
                <input
                  id="zip"
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
            <div className="form-item">
              <label htmlFor="address">Address</label>
              <input
                id="address"
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
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="scheduleDelivery"
                checked={isScheduleDelivery}
                onChange={() => setIsScheduleDelivery(!isScheduleDelivery)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="scheduleDelivery">Schedule Delivery</label>
            </div>
            {isScheduleDelivery && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="deliveryDate">Select Delivery Date</label>
                <select id="deliveryDate">
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="nextWeek">Next Week</option>
                </select>
              </motion.div>
            )}
            <div className="form-item">
              <label>Payment Method</label>
              <div className="icon-Div">
                <input
                  type="radio"
                  id="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                />
                <label htmlFor="online" className="icon-label">
                  <CreditCard className="icon" />
                  <span>Online Payment</span>
                </label>
              </div>
              <div className="icon-Div">
                <input
                  type="radio"
                  id="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                />
                <label htmlFor="cash" className="icon-label">
                  <DollarSign className="icon" />
                  <span>Cash on Delivery</span>
                </label>
              </div>
              <div className="icon-Div">
                <input
                  type="radio"
                  id="pos"
                  checked={paymentMethod === "pos"}
                  onChange={() => setPaymentMethod("pos")}
                />
                <label htmlFor="pos" className="icon-label">
                  <Truck className="icon" />
                  <span>POS on Delivery</span>
                </label>
              </div>
            </div>
            <div className="form-item">
              <label htmlFor="note">Additional Notes</label>
              <textarea id="note" placeholder="Any special instructions..." />
            </div>
            {Error ? <Alert severity="error">please fill in all</Alert> : null}
          </form>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <h2 className="card-title">Order Summary</h2>

          <div className="scrollable-product-list">
            {" "}
            {/* Scrollable container */}
            {product.map((item) => (
              <div className="product-summary" key={item?._id}>
                <img
                  src={item?.product?.img}
                  alt=""
                  className="product-image"
                />

                <div className="product-info">
                  <h3>{item?.product?.name}</h3>
                  <p>
                    {item?.quantity} x ${item?.product?.price?.org}
                  </p>
                </div>
                <div className="product-price">
                  ${(item?.quantity * item?.product?.price?.org).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="totalAmount">
            <span className="total">Total (+ Tax):</span>
            <span className="rupees">${calculateSubtotal().toFixed(2)}</span>
          </div>
          <button
            className="confirm-Button"
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
