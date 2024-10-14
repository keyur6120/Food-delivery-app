import bcrypt from "bcrypt";
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import { createError } from "../error.js";
import User from "../models/User.js";
import Food from "../models/Food.js";
import Orders from "../models/Orders.js";
import SplitBills from "../models/SplitBills.js";
import dotenv from "dotenv";
import Stripe from "stripe";
dotenv.config();

export const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name, img } = req.body;

    //Check for existing user
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return next(createError(409, "Email is already in use."));
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      img,
    });
    const createdUser = await user.save();
    const token = jwt.sign({ id: createdUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1 day",
    });
    return res.status(201).json({ token, user });
  } catch (err) {
    next(err);
  }
};

//user login
// done
export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Check for existing user
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      return next(createError(409, "User not found."));
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return next(createError(403, "Incorrect password"));
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "9999 years",
    });
    return res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
};

//! addCart

export const addToCart = async (req, res, next) => {
  try {
    const { productId, userId, quantity } = req.body;

    if (!productId || !userId || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.cart) {
      user.cart = [];
    }

    const existingCartItemIndex = user.cart.findIndex((item) =>
      item.product.equals(productId)
    );

    if (existingCartItemIndex !== -1) {
      user.cart[existingCartItemIndex].quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    // Save updated user document
    await user.save();

    return res.status(200).json({
      message: "Product added to cart successfully",
      cart: user.cart,
    });
  } catch (err) {
    console.error("Error in addToCart:", err); // Log the error for debugging
    next(err);
  }
};

//!deleteFromCart()
export const removeFromCart = async (req, res, next) => {
  try {
    const { productId, quantity, Id } = req.body;
    const user = await User.findById(Id);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const productIndex = user.cart.findIndex((item) => item.equals(productId));
    if (productIndex !== -1) {
      if (quantity && quantity > 0) {
        user.cart[productIndex].quantity -= quantity;
        if (user.cart[productIndex].quantity <= 0) {
          user.cart.splice(productIndex, 1); // Remove the product from the cart
        }
      } else {
        user.cart.splice(productIndex, 1);
      }

      await user.save();
      return res
        .status(200)
        .json({ message: "Product quantity updated in cart", user });
    } else {
      return next(createError(404, "Product not found in the user's cart"));
    }
  } catch (err) {
    next(err);
  }
};

//!getCart
export const getAllCartItems = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId).populate({
      path: "cart.product",
      model: "Food",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract the cart items from the user document
    const cartItems = user.cart;

    // Return the cart items as a JSON response
    return res.status(200).json(cartItems);
  } catch (err) {
    // Handle any errors that occur
    next(err);
  }
};

//new order
export const newOrder = async (req, res) => {
  const domain = "http://localhost:3000";
  const stripe = new Stripe(process.env.STRIPE_KEY);

  try {
    const {
      Username,
      total_amount,
      address,
      products,
      user,
      status,
      product_Info,
    } = req.body;

    const usercheck = await User.findById(user);
    if (!usercheck) {
      return res.status(404).json({ message: "User not found" });
    }

    const newOrderData = new Orders({
      Username,
      total_amount,
      address,
      products,
      user,
      status,
      product_Info,
    });

    const saveorder = await newOrderData.save();

    if (status === "online") {
      const id = saveorder._id.toString();
      const lineItems = product_Info.map((item, index) => {
        const quantity = products[index]?.qun || 1;
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.product_name,
              images: [item.product_image],
            },
            unit_amount: item.product_price * 100,
          },
          quantity: quantity,
        };
      });

      console.log('Order ID:', id);

      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: lineItems,
          success_url: `${domain}/`,
          cancel_url: `${domain}/canceled=true`,
          metadata: {
            orderId: id,
            userId: user,
          },
        });

        res.status(200).json({ url: session.url });
      } catch (err) {
        console.error("Stripe session creation error:", err);
        return res.status(500).json({ message: "Error creating Stripe session", error: err.message });
      }
    } else {
      await User.findByIdAndUpdate(user, {
        $push: { orders: saveorder._id },
        $set: { cart: [] },
      });

      res.status(200).json({ message: "Order placed successfully", saveorder });
    }
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
};


// export const getAllOrders = async (req, res, next) => {
//   try {
//     const { productId, userId } = req.body;

//     const user = await User.findById(userId);
//     if (!user.favourites.includes(productId)) {
//       user.favourites.push(productId);
//       await user.save();
//     }
//     return res
//       .status(200)
//       .json({ message: "Product added to favorites successfully", user });
//   } catch (err) {
//     next(err);
//   }
// };

//Favorites

export const removeFromFavorites = async (req, res, next) => {
  try {
    const { productId, userId } = req.body;
    const user = await User.findById(userId);
    user.favourites = user.favourites.filter((fav) => !fav.equals(productId));
    await user.save();

    return res
      .status(200)
      .json({ message: "Product removed from favorites successfully", user });
  } catch (err) {
    next(err);
  }
};

//!addToFavorites()
export const addToFavorites = async (req, res, next) => {
  try {
    const { userId, productId } = req.body;
    const user = await User.findById(userId);

    if (!user.favourites.includes(productId)) {
      user.favourites.push(productId);
      await user.save();
    }

    return res
      .status(200)
      .json({ message: "Product added to favorites successfully", user });
  } catch (err) {
    next(err);
  }
};

export const getUserFavorites = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId).populate("favourites").exec();
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const favoriteProducts = user.favourites;

    // console.log("from uid")

    return res.status(200).json(favoriteProducts);
  } catch (err) {
    next(err);
  }
};

export const getverfied = async (req, res) => {
  try {
    // Extract the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(500).Json({ message: "header is not reaching to decoder" });
    }
    // Extract the JWT token from the Authorization header
    const token = authHeader.substring("Bearer=".length);

    try {
      // Decode the token to get the user ID or other relevant information
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      // Find the user in the database by their ID
      const user = await User.findById(userId).select("name email");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else {
        return res.status(200).json({ message: "User found", userId });
      }
    } catch (error) {
      console.log("Error decoding token:", error);
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    console.log("Server error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const SplitBill = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(500).json({ message: "user not found" });
    }

    const splitBill = new SplitBills(req.body);

    const savedSplitBill = await splitBill.save();

    user.splitBills.push(savedSplitBill);

    await user.save();

    return res.status(201).json(savedSplitBill); // Ensure to use 'return' to prevent further execution
  } catch (error) {
    return res.status(400).json({ error: error.message }); // Ensure to use 'return' to prevent further execution
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const user = await User.findById(userId).populate({
      path: "orders",
      select:
        "address products total_amount status createdAt updatedAt product_Info Username delivery_status Time",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user.orders);
  } catch (err) {
    next(err);
  }
};

