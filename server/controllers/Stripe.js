// import Orders from "../models/Orders.js";
// import User from '../models/User.js'
import Stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

export const foodTest = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_KEY)
    try {
        const { Username, total_amount, address, products, user, status, product_Info } = req.body;

        // console.log(data)
        // // Create data structure for Stripe
        const lineItems = product_Info.map((item) => {
            return {
                price_data: {
                    currency: 'usd',
                    name: item.product_name,
                    image: item.product_image,
                },
                unit_amount: item.product_price, // Convert to cents
            }
        })

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        res.status(200).json({ sessionId: session.id })

    } catch (error) {
        res.status(500).json({ message: "Error placing order", error });
    }
}