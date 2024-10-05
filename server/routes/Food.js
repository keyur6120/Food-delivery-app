import express from "express";
import { addProducts
    , getFoodById
    , getFoodItems
    ,createCategory
 } from "../controllers/Food.js";


const router = express.Router();

router.post("/add", addProducts);
router.get("/", getFoodItems);
router.get("/:foodId/:RestaurantId", getFoodById);


router.post("/category",createCategory)


// router.post('/')
export default router;
