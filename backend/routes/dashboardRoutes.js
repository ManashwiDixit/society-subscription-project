import express from "express";
import {auth} from "../middleware/authMiddleware.js"
import { getDashboardData } from "../controllers/dashboardControllers.js";

const router = express.Router();

router.get("/" ,auth, getDashboardData);

export default router;