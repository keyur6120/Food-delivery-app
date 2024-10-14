import {Router} from 'express'
import { makeProfileforRestaurant,getRestaurants,getRestoById,modifyOrder } from '../controllers/restaurant.js'



const router  = Router()


router.post('/create',makeProfileforRestaurant)
router.get('/GetRestaurant',getRestaurants)
router.post('/RestroById/:id',getRestoById)
router.post('/modifyOrder',modifyOrder)

export default router