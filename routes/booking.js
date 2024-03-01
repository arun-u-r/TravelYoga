import express from 'express';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import { createBooking, getAllBooking, getSingleBooking } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post('/', verifyUser, createBooking);
bookingRouter.get('/', verifyAdmin, getAllBooking);
bookingRouter.get('/:id', verifyUser, getSingleBooking);

export default bookingRouter;