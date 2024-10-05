import React, { useEffect, useState } from "react";
import { CircularProgress, Rating } from "@mui/material";
import {
  AddShoppingCartOutlined,
  FavoriteBorder,
  FavoriteRounded,
  ShoppingBagOutlined,
  ShoppingCart,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import {
  addToFavourite,
  deleteFromFavourite,
  getFavourite,
  addToCart,
} from "../../api";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/reducers/SnackbarSlice";


const ProductsCard = ({ product }) => {
  const [Data, setData] = useState([product])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const addFavourite = async () => {
    setFavoriteLoading(true);
    const Id = localStorage.getItem("]user_Id");
    await addToFavourite({ pid:product?._id, uid :Id })
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

  const removeFavourite = async () => {
    setFavoriteLoading(true);
    const Id = localStorage.getItem("user_Id");
    await deleteFromFavourite({ pid: product?._id, uid : Id  })
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

  const checkFavorite = async () => {
    setFavoriteLoading(true);
    const productId = product._id
    const Id = localStorage.getItem("user_Id");
    await getFavourite({uid : Id})
      .then((res) => {
       const IdEx = res.data.map((item)=>{
        return item._id
       })
       if(productId === IdEx){
         setFavorite(true);
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

  const addCart = async (id) => {
    const userid = localStorage.getItem("user_Id");
    await addToCart({ pid: id, qun: 1 , uid : userid})
      .then((res) => {
        console.log('Product added to cart',res.data);
        // navigate("/cart");
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

  useEffect(() => {
    checkFavorite();
  }, [favorite]);
  return (
    <div className="product-list">
    {Data.map(product => (
      <div key={product._id} className="product-card" >
        <div className="product-image-container">
          <img src={product.img} alt={product.name} className="product-image" />
          <button className="like-button">
            <FaHeart />
          </button>
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <p>{product.category.join(", ")}</p>
          <div className="product-footer">
            <p className="price">₹{product.price.mrp.toFixed(2)}</p>
            <button className="add-to-cart" onClick={()=>addCart(product._id)}>
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
