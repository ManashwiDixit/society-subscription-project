import express from "express";
import { getPlans, updatePlan } from "../controllers/subscriptionController.js";

const router = express.Router();

router.get("/" , getPlans);
router.put("/:id", updatePlan);

export default router;