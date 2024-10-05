import React, { useEffect, useState } from "react";
import "./Restaurant.css";
import { getRestaurants } from "../../api/index.js";
import { FaStar, FaClock, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = () => {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState({});

  const Navigation = useNavigate();
  const getRestro = async () => {
    try {
      const response = await getRestaurants();
      setData(response.data.data);
    } catch (error) {
      console.error("Error getting restaurants:", error);
    }
  };

  useEffect(() => {
    getRestro();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites(prev => ({...prev, [id]: !prev[id]}));
  };

  return (
    <div className="cards-container">
      {data.map((item, index) => (
        <div className="card" key={item.id || index} onClick={()=>Navigation(`/Details/${item._id}`)}>
          <div className="card-image-container">
            <img className="card-image" src={item.images} alt={item.name} />
            <button 
              className={`favorite-btn ${favorites[item.id] ? 'active' : ''}`}
              onClick={() => toggleFavorite(item.id)}
            >
              <FaHeart />
            </button>
          </div>
          <div className="card-content">
            <h3 className="card-title">{item.name}</h3>
            <p className="card-cuisine">{item.cuisine}</p>
            <div className="card-info">
              <span className="card-rating">
                <FaStar /> {item.rating}
              </span>
              <span className="card-delivery-time">
                <FaClock /> {item.deliveryTime} mins
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantCard;