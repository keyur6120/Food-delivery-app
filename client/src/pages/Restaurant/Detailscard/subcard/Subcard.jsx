import React from "react";
import {useNavigate} from 'react-router-dom'

export default function Sub({ data,menuItems,restuaranID}) {
  
  const navigate = useNavigate();

  if (!data || !data.menu) {
    return <p>Loading...</p>;
  }
  
  const Maindata = data.menu;
  return (
    <>
      <h3>{menuItems}</h3>
      <div className="menu-items">
        {Maindata.map((item, index) => (
          <div className="menu-item" key={index} onClick={()=> navigate(`/dishes/${item._id}?restroId=${restuaranID}`)}>
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h4>{item.name}</h4>
              <div className="item-rating">
                <span className="stars">★★★★★</span>
                <span className="votes">5 votes</span>
              </div>
              <p className="price">₹{item.price.mrp}</p>
              <p className="description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
