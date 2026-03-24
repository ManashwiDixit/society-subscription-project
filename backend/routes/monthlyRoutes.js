import express from "express";
import { getRecords, markPaid ,generateMonthlyRecords,getUserRecord} from "../controllers/monthlyController.js";
import { auth, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getRecords);
router.put("/:id/pay", markPaid);
router.get("/user", auth, getUserRecord);
router.post("/generate", auth, adminOnly, generateMonthlyRecords)

export default router;