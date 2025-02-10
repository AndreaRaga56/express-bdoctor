import express from 'express';
import reviewsController from '../Controllers/reviewController.js';
const router = express.Router();

//Index
router.get("/:slug", reviewsController.getReviews);

//Create
router.post("/doctors/:slug/reviews", reviewsController.createReviews);

export default router;
