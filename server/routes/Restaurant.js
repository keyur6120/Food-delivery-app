import {Router} from 'express'
import { makeProfileforRestaurant,getRestaurants,getRestoById } from '../controllers/restaurant.js'



const router  = Router()


router.post('/create',makeProfileforRestaurant)
router.get('/GetRestaurant',getRestaurants)
router.post('/RestroById/:id',getRestoById)

export default router