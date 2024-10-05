import Category from '../models/CategorySchema.js'
import mongoose from "mongoose";

export const createCategories = async (req, res) => {
  try {
    const categories = req.body; // This should be an array of objects

    if (!Array.isArray(categories)) {
      return res.status(400).json({ message: "Data should be an array of categories." });
    }

    const createdCategories = [];

    for (const category of categories) {
      const { name, image, off } = category;

      if (!name || !image) {
        return res.status(400).json({ message: "Each category must have a name and an image." });
      }

      const newCategory = new Category({
        name,
        image,
        off: off || null // If 'off' is not provided, set it to null or you can leave it undefined
      });

      const savedCategory = await newCategory.save();
      createdCategories.push(savedCategory);
    }

    res.status(201).json({ message: "Categories created successfully", data: createdCategories });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while creating categories", error });
  }
};



export const getAllCategories = async(req,res,next) => {
  try {
    const categories = await Category.find()
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({message: "error at category controller", error})
  }
}
