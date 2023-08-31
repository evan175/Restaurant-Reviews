import express from "express";
import RestaurantsController from "./restaurants.controller.js";
import ReviewsController from "./reviews.controller.js";

const router = express.Router();

router.get('/', RestaurantsController.apiGetRestaurants);
router.get('/id/:id', RestaurantsController.apiGetRestaurantById);
router.get('/cuisines', RestaurantsController.apiGetRestaurantCuisines);

router.post('/review', ReviewsController.apiPostReview);
router.put('/review', ReviewsController.apiUpdateReview);
router.delete('/review', ReviewsController.apiDeleteReview);

export default router;