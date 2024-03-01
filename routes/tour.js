import express from "express";
const tourRouter = express.Router();

import {
  createTour,
  deleteTour,
  getAllTour,
  getFeaturedTour,
  getSingleTour,
  getTourBySearch,
  getTourCount,
  updateTour,
} from "../controllers/tourController.js";
import { verifyAdmin, verifyUser }  from '../utils/verifyToken.js'



tourRouter.post("/", verifyAdmin, createTour);
tourRouter.put("/:id",verifyAdmin, updateTour);
tourRouter.delete("/:id",verifyAdmin, deleteTour);
tourRouter.get("/:id",verifyAdmin, getSingleTour);
tourRouter.get("/", getAllTour);
tourRouter.get("/search/getTourBySearch", getTourBySearch)
tourRouter.get("/search/getFeaturedTour", getFeaturedTour)
tourRouter.get("/search/getTourCount", getTourCount)

export default tourRouter;
