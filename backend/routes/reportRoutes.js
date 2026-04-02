import express from "express";
import { getAdminReport } from "../controllers/reportController.js";
import { auth, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", auth ,adminOnly, getAdminReport);
export default router;