import express from 'express'
import { createCategories, getAllCategories } from '../controllers/Category.js'

const router = express.Router();

router.post("/createNew",createCategories)

router.get('/getAllcategory',getAllCategories)

export default router;