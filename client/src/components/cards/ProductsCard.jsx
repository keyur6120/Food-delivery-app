import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import {
  addToFavourite,
  deleteFromFavourite,
  getFavourite,
  addToCart,
} from "../../api";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/reducers/SnackbarSlice";

const ProductsCard = ({ product }) => {
  const [Data, setData] = useState([product]); // Mock product data
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const dispatch = useDispatch();

  // Function to add to favorite
  const addFavourite = async () => {
    setFavoriteLoading(true);
    const userId = localStorage.getItem("user_Id"); // Fixed typo here
    await addToFavourite({ pid: product?._id, uid: userId })
      .then((res) => {
        setFavorite(true);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        console.log(err);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };
console.log('data',Data)
  // Function to remove from favorite
  const removeFavourite = async () => {
    setFavoriteLoading(true);
    const userId = localStorage.getItem("user_Id");
    await deleteFromFavourite({ pid: product?._id, uid: userId })
      .then((res) => {
        setFavorite(false);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  // Check if the product is already in the favorite list
  const checkFavorite = async () => {
    setFavoriteLoading(true);
    const productId = product._id;
    const userId = localStorage.getItem("user_Id");
    await getFavourite({ uid: userId })
      .then((res) => {
        const favIds = res.data.map((item) => item._id); // Get all favorite product IDs
        if (favIds.includes(productId)) {
          setFavorite(true);
        } else {
          setFavorite(false);
        }
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  // Function to add product to cart
  const addCart = async (id) => {
    const userId = localStorage.getItem("user_Id");
    await addToCart({ pid: id, qun: 1, uid: userId })
      .then((res) => {
        console.log("Product added to cart", res.data);
      })
      .catch((err) => {
        dispatch(
          openSnackbar({
            message: err.response.data.message,
            severity: "error",
          })
        );
      });
  };

  // Check if product is in favorites on component mount
  useEffect(() => {
    checkFavorite();
  }, [favorite]);

  return (
    <div className="product-list">
      {Data.map((product) => (
        <div key={product._id} className="product-card">
          <div className="product-image-container">
            <img
              src={product.img}
              alt={product.name}
              className="product-image"
            />
            <button
              className="like-button"
              onClick={favorite ? removeFavourite : addFavourite}
              disabled={favoriteLoading}
            >
              {favoriteLoading ? (
                <CircularProgress size={15} />
              ) : favorite ? (
                <FaHeart color="red" />
              ) : (
                <FaHeart color="black" />
              )}
            </button>
          </div>
          <div className="product-info">
            <h3>{product.name}</h3>
            <p>{product.category.join(", ")}</p>
            <div className="product-footer">
              <p className="card-price">₹{product.price.mrp}</p>
              <button
                className="add-to-cart"
                onClick={() => addCart(product._id)}
              >
                <FaShoppingCart /> Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsCard;
