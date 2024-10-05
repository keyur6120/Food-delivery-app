import React from "react";

export default function Sub({ data }) {
  // Check if data exists and has a menu, else render a fallback (e.g., loading or empty state)
  if (!data || !data.menu) {
    return <p>Loading...</p>; // or show some placeholder
  }
console.log('from sub data',data)
  const Maindata = data.menu;

  return (
    <>
      <h3>Newly Launched</h3>
      <div className="menu-items">
        {Maindata.map((item, index) => (
          <div className="menu-item" key={index}>
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
