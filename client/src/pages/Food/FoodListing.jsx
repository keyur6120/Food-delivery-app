import React, { useState, useEffect } from "react";
import "./FoodListing.css";
import { getAllProducts } from "../../api/index.js";
import { CircularProgress, Slider } from "@mui/material";
import ProductCard from "../../components/cards/ProductsCard.jsx";

const FoodListing = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState(["Pizza", "Burger", "Sushi", "Salad", "Dessert"])

  
  console.log('cate',categories);
  const getFilteredProductsData = async () => {
    setLoading(true);
    try {
      const query =
        selectedCategories.length > 0
          ? `minPrice=${priceRange[0]}&maxPrice=${
              priceRange[1]
            }&categories=${selectedCategories.join(",")}`
          : `minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;

      const res = await getAllProducts(query);
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFilteredProductsData();
  }, [priceRange, selectedCategories]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <div className="food-listing">
      <div className="filters">
        <h2>Filters</h2>
        <div className="filter-section">
          <h3>Categories</h3>
          <div className="category-list">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-item ${
                  selectedCategories.includes(category) ? "selected" : ""
                }`}
                onClick={() => handleCategoryToggle(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-section">
          <h3>Price Range</h3>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            marks={[
              { value: 0, label: "₹0" },
              { value: 1000, label: "₹1000" },
            ]}
          />
          <p>
            ₹{priceRange[0]} - ₹{priceRange[1]}
          </p>
        </div>
      </div>

      <div className="products">
        <h2>Products</h2>
        {loading ? (
          <CircularProgress />
        ) : (
          <div className="card-wrapper">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodListing;
