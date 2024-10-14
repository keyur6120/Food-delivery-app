import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    Username: {
      type: String,
      required: true,
    },
    total_amount: {
      type: Number,
      required: true,
    },
    address: {
      city: { type: String },
      state: { type: String },
      ZIP: { type: String },
      complete_address: { type: String },
    },
    status: {
      type: String,
      default: "Payment Done",
    },
    delivery_status: {
      type: String,
      default: "Food Processing",
    },
    Time: {
      type: Number,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId },
        quantity: { type: Number },
      },
    ],
    product_Info: [
      {
        product_name: { type: String },
        product_price: { type: Number },
        product_image: { type: String },
        quantity: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Orders", OrderSchema);
