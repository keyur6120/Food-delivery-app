import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    Username: {
      type: String,
      required: true
    },
    total_amount: {
      type: Number,
      required: true,
    },
    address: {
      city: { type: String },
      state: { type: String},
      ZIP: { type: String},
      complete_address: { type: String},
    },
    status: {
      type: String,
      default: "Payment Done",
    },
    user: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [{
      productId : {type : mongoose.Schema.Types.ObjectId },
      quantity : {type : Number}
    }]
  },
  { timestamps: true }
);

export default mongoose.model("Orders", OrderSchema);
