import express from "express";
import { createUser , getProfile } from "../controllers/userController.js";
import { auth, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", auth, adminOnly, createUser);
router.get("/profile", auth, getProfile);

export default router;