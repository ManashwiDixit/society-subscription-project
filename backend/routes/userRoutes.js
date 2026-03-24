import express from "express";
import { createUser } from "../controllers/userController.js";
import { auth, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", auth, adminOnly, createUser);

export default router;