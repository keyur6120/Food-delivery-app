import Restaurant from "../models/Restaurant.js";
import User from "../models/User.js";


//create restaurant
export const makeProfileforRestaurant = async (req, res, next) => {
    try {
        // Destructure data from request body
        const restroInfo = req.body
        const newarray = []

        for (const RestaurantInfo of restroInfo) {
            const { RestroMail, name, address, phone, documents, menu, Location } = RestaurantInfo
            const newrestro = new Restaurant({
                RestroMail, name, address, phone, documents, menu, Location
            })
            const savingrestro = newrestro.save()
            newarray.push(savingrestro)
        }
        res.status(200).json({ message: "create new restro", data: newarray })
    } catch (error) {
        console.error('Error creating restaurant profile:', error); // Debugging line
        next(error);
    }
};

export const getRestaurants = async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json({ message: "All restaurants", data: restaurants });
    } catch (error) {
        console.error('Error getting restaurants:', error); // Debugging line
        next(error);
    }
}

export const getRestoById = async (req, res, next) => {
    try {
        const Id = req.params.id;
        const restaurant = await Restaurant.findById(Id);
        res.status(200).json({ message: "Restaurant by id", data: restaurant });
    } catch (error) {
        console.error('Error getting restaurant by id:', error); // Debugging line
        next(error);
    }
}