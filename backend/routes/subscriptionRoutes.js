import express from "express";
import { getPlans, updatePlan } from "../controllers/subscriptionController.js";
import { auth, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/" , adminOnly,auth, getPlans);
router.put("/:id",adminOnly, auth, updatePlan);

export default router;