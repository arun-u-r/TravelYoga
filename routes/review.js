import express from 'express';
import { createReview } from '../controllers/reviewController.js';
import { verifyUser } from '../utils/verifyToken.js';

const reviewRouter = express.Router();

reviewRouter.post('/:tourId', verifyUser, createReview );

export default reviewRouter;