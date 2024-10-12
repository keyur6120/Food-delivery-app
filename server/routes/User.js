import express from "express";
import {
  UserLogin,
  UserRegister,
  addToCart,
  addToFavorites,
  getAllCartItems,
  // getAllOrders,
  getUserFavorites,
  newOrder,
  removeFromCart,
  removeFromFavorites,
  getverfied,
  SplitBill,
  getUserOrders
} from "../controllers/User.js";
import { verifyToken } from "../middleware/verifyUser.js";
import {handleWebhook} from '../controllers/Stripe.js'

const router = express.Router();


//login routes
router.post("/signup", UserRegister);
router.post("/signin", UserLogin);
router.post("/verify", verifyToken)

//cart routes
router.post("/addcart", addToCart);
router.get("/getallcartItem", getAllCartItems);
router.patch("/RemovecartItem",removeFromCart);

//favorites routes
router.post("/addfav", addToFavorites);
router.get("/getfav", getUserFavorites);  
router.patch("/removefav", removeFromFavorites);

//order routes
router.post("/order", newOrder);
// router.get("/getOrder", getAllOrders);
router.get("/userOrder",getUserOrders)

//split bill & Bill routes
router.post("/getuserId",getverfied)
router.post("/splitBills", SplitBill)


router.post("/webhook",express.raw({type:'application/json'}),handleWebhook)

//testing route
// router.post("/FoodTest",foodTest);
export default router;
