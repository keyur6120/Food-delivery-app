import getRawBody from "raw-body";
import Stripe from "stripe";
import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config({ path: "../.env" });

export const handleWebhook = async (req, res) => {
  console.log("stripe has called this function");
  const stripe = new Stripe(process.env.STRIPE_KEY);
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const user = session.metadata.userId;
    const orderId = session.metadata.orderId;
    console.log("user id got in webhook", user);
    console.log("order id got in webhook", orderId);
    await User.findByIdAndUpdate(user, {
      $push: { orders: orderId },
      $set: { cart: [] },
    });
  }

  res.json({ received: true });
};
