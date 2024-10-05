import React, { useState } from "react";
import './Test.css'
import { FaHeart, FaShoppingCart } from 'react-icons/fa';


export default function Sub({product}) {
    const [Data, setData] = useState([product])
  return (
    <div className="product-list">
    {Data.map(product => (
      <div key={product._id} className="product-card">
        <div className="product-image-container">
          <img src={product.img} alt={product.name} className="product-image" />
          <button className="like-button">
            <FaHeart />
          </button>
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <p>{product.category}</p>
          <div className="product-footer">
            <p className="price">₹{product.price.mrp.toFixed(2)}</p>
            <button className="add-to-cart">
              <FaShoppingCart /> Add
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}
