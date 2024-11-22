import bcrypt from "bcrypt";
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import { createError } from "../error.js";
import User from "../models/User.js";
import Food from "../models/Food.js";
import Orders from "../models/Orders.js";
import Restaurant from "../models/Restaurant.js";
import SplitBills from "../models/SplitBills.js";
import dotenv from "dotenv";
import Stripe from "stripe";
dotenv.config();

export const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name, img, Number } = req.body;

    if (typeof Number == String || Number.length < 10 || Number.length > 10) {
      return next(createError(400, "Phone number must be a 10-digit"));
    }

    //Check for existing user
    const existingUser = await User.findOne({
      $or: [{ email: email }, { phone: Number }],
    });
    if (existingUser) {
      console.log("find it");
      return next(createError(409, "Email or phone number is already in use"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      img,
      phone: Number,
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
    const { productId, userId, quantity, RestroId } = req.body;

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

    const existingCartItemIndex = user.cart.findIndex((item) => {
      return item.product.includes(productId);
    });
    if (existingCartItemIndex !== -1) {
      user.cart[existingCartItemIndex].quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity, Restro: RestroId });
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
    if(productIndex){
      user.cart.splice(productIndex,1)
    }
      await user.save();
      return res
        .status(200)
        .json({ message: "Product quantity updated in cart", user });
    }
    catch(error){
      next(error)
    } 
  } 
//!getCart
export const getAllCartItems = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchData = [];
    const unmatchedData = [];

    await Promise.all(
      user.cart.map(async (item) => {
        const productId = item.product;
        const quantity   = item.quantity

        const findInFood = await Food.findById(productId);

        if (findInFood) {
          matchData.push({
            _id : productId,
            product: findInFood, 
            quantity : quantity
          });
        } else {
          unmatchedData.push(item);
        }
      })
    );

    await Promise.all(
      unmatchedData.map(async (item) => {
        const productId = item.product;
        const RestroId = item.Restro;
        const quantity   = item.quantity

        const findInRestaurant = await Restaurant.findById(RestroId, {
          menu: { $elemMatch: { productId } },
        })
        if(findInRestaurant.menu.length >0){
          const restroData = findInRestaurant.menu[0]
          matchData.push({
            _id : productId,
            product: restroData,
            quantity : quantity
          });
        }
      })
    );

    return res.status(200).json(matchData);
  } catch (err) {
    console.error("Error in getAllCartItems:", err);
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

      console.log("Order ID:", id);

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
        return res.status(500).json({
          message: "Error creating Stripe session",
          error: err.message,
        });
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
    const { userId,orderId,friends } = req.body;

    const user = await User.findById(userId)
    if (!user) {
      return res.status(500).json({ message: "user not found" });
    }

    const findOrder = await Orders.findById(orderId)
    const Split = findOrder.total_amount / (friends.length + 1)

    const BillDetails = friends.map((friend)=>({
        email : friend.email,
        amountOwed: Split,
    }))


    const splitBill = new SplitBills({
      Owner:userId,
      orderId:orderId,
      details : BillDetails
    })
    await splitBill.save()

    return res.status(201).json(splitBill); // Ensure to use 'return' to prevent further execution
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

// {
//   "address": {
//       "city": "unjha",
//       "state": "Gujarat",
//       "ZIP": "384170",
//       "complete_address": "14,astha bunglow,unjha"
//   },
//   "_id": "6737293ae6a028fce79311bd",
//   "Username": "Keyur Suthar",
//   "total_amount": 306.8,
//   "status": "cash",
//   "delivery_status": "Food Processing",
//   "Time": null,
//   "products": [
//       {
//           "productId": "66bb5daaa8e3e20b30b4f343",
//           "quantity": 1,
//           "_id": "6737293ae6a028fce79311be"
//       },
//       {
//           "productId": "66bb5daaa8e3e20b30b4f337",
//           "quantity": 1,
//           "_id": "6737293ae6a028fce79311bf"
//       }
//   ],
//   "product_Info": [
//       {
//           "product_name": "Creamy Alfredo Pasta",
//           "product_price": 180,
//           "product_image": "https://www.allrecipes.com/thmb/gTibTRJ8MW87L0jMhAvXPjIDD94=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/19402-quick-and-easy-alfredo-sauce-DDMFS-4x3-17abb2055c714807944172db9172b045.jpg",
//           "quantity": 1,
//           "_id": "6737293ae6a028fce79311c0"
//       },
//       {
//           "product_name": "Chocolate Brownie Sundae",
//           "product_price": 80,
//           "product_image": "https://recipes.net/wp-content/uploads/2023/05/liams-brownie-sundae_19db08639783daa2a1f2774a647e28cc.jpeg",
//           "quantity": 1,
//           "_id": "6737293ae6a028fce79311c1"
//       }
//   ],
//   "createdAt": "2024-11-15T10:58:02.463Z",
//   "updatedAt": "2024-11-15T10:58:02.463Z"
// }