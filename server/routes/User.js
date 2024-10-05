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



const router = express.Router();

router.post("/signup", UserRegister);

//!done
router.post("/signin", UserLogin);

router.post("/verify", verifyToken)

router.post("/addcart", addToCart);
router.get("/getallcartItem", getAllCartItems);
router.patch("/RemovecartItem",removeFromCart);

router.post("/addfav", addToFavorites);
router.get("/getfav", getUserFavorites);
router.patch("/removefav", removeFromFavorites);

router.post("/order", newOrder);
// router.get("/getOrder", getAllOrders);
router.get("/userOrder",getUserOrders)

router.post("/getuserId",getverfied)
router.post("/splitBills", SplitBill)

export default router;
