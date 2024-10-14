import React, { useState } from "react";
import "./Add.css";
import { assets } from '../../../../client/src/assets/assets.js';
import { toast } from "react-toastify";
import { addFood } from "../../api/Api.js";

const Add = () => {
  const [data, setData] = useState({
    name: "",
    desc: "",
    price: { org: 0, mrp: 0, off: 0 },
    img: null,
    category: "",
    ingredients: ["ingredient1", "ingredient2"],
  });

  console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("desc", data.desc);
    formData.append("priceOrg", data.price.org);
    formData.append("priceMrp", data.price.mrp);
    formData.append("priceOff", data.price.off);
    formData.append("category", data.category);
    formData.append("ingredients", JSON.stringify(data.ingredients)); // Convert array to JSON
    formData.append("img", data.img);
    if (!data.img) {
      return toast.error("Please upload an img");
    }

    try {
      const res = await addFood(formData) // Send formData instead of JSON data
      .then((res)=>{
        toast.success("Product added successfully");
        window.location.reload();
      })
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="add-img-upload flex-col">
          <p>Upload img</p>
          <label htmlFor="img">
            <img
              src={data.img ? URL.createObjectURL(data.img) : assets.addphotos}
              alt="Preview"
            />
          </label>
          <input
            type="file"
            id="img"
            hidden
            onChange={(e) => setData({ ...data, img: e.target.files[0] })} // Set img file
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="Type Here"
            required
          />
        </div>
        <div className="add-product-desc flex-col">
          <p>Product desc</p>
          <textarea
            value={data.desc}
            onChange={(e) => setData({ ...data, desc: e.target.value })}
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              value={data.category}
              onChange={(e) => setData({ ...data, category: e.target.value })}
              required
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              type="number"
              value={data.price.org}
              onChange={(e) => setData({ ...data, price: { ...data.price, org: e.target.value } })}
              placeholder="Enter Price"
              required
            />
          </div>
        </div>
        <button type="submit" className="add-btn">ADD</button>
      </form>
    </div>
  );
};

export default Add;
