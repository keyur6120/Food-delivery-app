import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    friends: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    socketId: {
      type: String,
      default: null,
    },
    img: {
      type: String,
      default: null,
    },
    favourites: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Food",
      default: [],
    },
    orders: {
      type: [mongoose.Schema.Types.ObjectId], // Changed to an array for multiple orders
      ref: "Orders",
      default: [],
    },
    cart: {
      type: [
        {
          product: { type: String},
          Restro : {type:String},
          quantity: { type: Number, default: 1 },
        },
      ],
      default: [],
    },
    restaurant: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Restaurant",
      default: [],
    },
    categories: {
      type: [String], // Ensure this is initialized as an array
      default: [],
    },
    splitBills: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "splitBills",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
