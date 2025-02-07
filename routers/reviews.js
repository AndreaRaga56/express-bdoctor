import express from 'express';
import reviewsController from '../Controllers/reviewController.js';
const router = express.Router();

//Index
router.get("/:id", reviewsController.getReviews);

//Create
router.post("/doctors/:id/reviews", reviewsController.createReviews);

export default router;
