import React, { useState, useEffect } from "react";
import "./Details.css";
import Subpage from "./subcard/Subcard.jsx";
import { getRestoById } from "../../../api/index.js";
import { useParams } from "react-router-dom";

export default function RestaurantPage() {
  const { id } = useParams();
  const [activeCategory, setActiveCategory] = useState("Order Online"); 
  const [horizontalButton, setHorizontalButton] = useState([
    "Overview",
    "Order Online",
    "Reviews",
  ]);
  const [verticalButton, setVerticalButton] = useState([
    "Newly Launched",
  ]);
  const [menuItems, setMenuItems] = useState("Newly Launched");
  const [data, setData] = useState();

  useEffect(() => {
    const getResto = async () => {
      try {
        const response = await getRestoById(id);
        setData(response.data.data);
      } catch (error) {
        console.error("Error getting restaurants:", error);
      }
    };
    getResto();
  }, [id]);

  const category = data?.menu.map((item) => item.category).join(", ");
  return (
    <div className="restaurant-page">
      
      <header className="header">
        <div className="header-main">
          <div className="restaurant-info">
            <h1>{data?.name}</h1>
            <p>{category}</p>
            <p>{data?.Location}</p>
            <p className="open-hours">Open now - 10am – 3:45am (Today)</p>
          </div>
          <div className="ratings">
            <div className="rating">
              <span className="rating-score">3.9 ★</span>
              <span>568 Dining Ratings</span>
            </div>
            <div className="rating">
              <span className="rating-score">4.2 ★</span>
              <span>17.6K Delivery Ratings</span>
            </div>
          </div>
        </div>
        <div className="action-buttons">
          <button>Direction</button>
          <button>Bookmark</button>
          <button>Share</button>
        </div>
      </header>

      <nav className="nav-tabs">
        {horizontalButton.map((tab) => (
          <button
            key={tab}
            className={activeCategory === tab ? "active" : ""}
            onClick={() => setActiveCategory(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {activeCategory === "Order Online" && (
        <main className="main-content">
          <aside className="sidebar">
            <h2>Order Online</h2>
            <ul className="menu-categories">
              <li>
                {verticalButton.map((category) => (
                  <button
                    key={category}
                    className={menuItems === category ? "active" : ""}
                    onClick={() => setMenuItems(category)}
                  >
                    {category}
                  </button>
                ))}
              </li>
            </ul>
          </aside>

          <section className="menu-section">
            <div className="menu-header">
              <h2>Order Online</h2>
              <div className="search-bar">
                <input type="text" placeholder="Search within menu" />
              </div>
            </div>

            <div className="scrollable-content">
              <Subpage data={data} />
            </div>
          </section>
        </main>
      )}
    </div>
  );
}
