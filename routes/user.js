import express from "express";
const userRouter = express.Router();

import {
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from '../controllers/userController.js';

import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";


userRouter.put("/:id", verifyUser, updateUser);
userRouter.delete("/:id", verifyUser, deleteUser);
userRouter.get("/:id", verifyUser, getSingleUser);
userRouter.get("/", verifyAdmin, getAllUser);

   
export default userRouter;