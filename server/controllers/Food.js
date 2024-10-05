import mongoose from "mongoose";
import Food from "../models/Food.js";
import { createError } from '../error.js'
import Restaurant from '../models/Restaurant.js'


export const addProducts = async (req, res, next) => {
  try {
    const foodData = req.body;
    if (!Array.isArray(foodData)) {
      return next(
        createError(400, "Invalid request. Expected an array of foods.")
      );
    }
    let createdfoods = [];
    for (const foodInfo of foodData) {
      const { name, desc, img, price, ingredients, category } = foodInfo;
      const product = new Food({
        name,
        desc,
        img,
        price,
        ingredients,
        category,
      });
      const createdFoods = await product.save();
      createdfoods.push(createdFoods);
    }
    return res
      .status(201)
      .json({ message: "Products added successfully", createdfoods });
  } catch (err) {
    next(err);
  }
};


//!getAllProducts
export const getFoodItems = async (req, res, next) => {
  try {
    let { categories, minPrice, maxPrice, ingredients, search } = req.query;
    ingredients = ingredients?.split(",");
    categories = categories?.split(",");

    const filter = {};
    if (categories && Array.isArray(categories)) {
      filter.category = { $in: categories }; // Match products in any of the specified categories
    }
    if (ingredients && Array.isArray(ingredients)) {
      filter.ingredients = { $in: ingredients }; // Match products in any of the specified ingredients
    }
    if (maxPrice || minPrice) {
      filter["price.org"] = {};
      if (minPrice) {
        filter["price.org"]["$gte"] = parseFloat(minPrice);
      }
      if (maxPrice) {
        filter["price.org"]["$lte"] = parseFloat(maxPrice);
      }
    }
    if (search) {
      filter.$or = [
        { title: { $regex: new RegExp(search, "i") } }, // Case-insensitive title search
        { desc: { $regex: new RegExp(search, "i") } }, // Case-insensitive description search
      ];
    }
    const foodList = await Food.find(filter);

    return res.status(200).json(foodList);
  } catch (err) {
    next(err);
  }
};



//! getProductDetails()
export const getFoodById = async (req, res, next) => {
  try {
    const { foodId, RestaurantId } = req.params;

    if (!mongoose.isValidObjectId(foodId)) {
      return next(createError(400, "Invalid food ID"));
    }

    const food = await Food.findById(foodId);
    if (food) {
      return res.status(200).json(food);
    }

    const restaurant = await Restaurant.findById(RestaurantId);
    if (!restaurant) {
      return next(createError(404, "Restaurant not found"));
    }

    const menuItem = restaurant.menu.find(item => item._id.toString() === foodId);
    if (!menuItem) {
      return next(createError(404, "Food item not found in the restaurant's menu"));
    }

    return res.status(200).json(menuItem);
  } catch (err) {
    next(err);
  }
};


// create food category 
export const createCategory = async (req, res, next) => {
  try {
    const { name, Url } = req.body
    const category = new Category({
      name: name,
      image: Url
    })
    await category.save()
    res.status(200).json({ message: 'done' })
  } catch (error) {
    res.status(500).json({ message: "error at category controller", error })
  }
}


