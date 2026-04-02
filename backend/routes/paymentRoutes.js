import { createPayment } from "../controllers/paymentController.js";
import { adminOnly, auth, } from "../middleware/authMiddleware.js";

import express from "express";

const router = express.Router();

router.post("/", auth, adminOnly,  createPayment);
//  router.get("/", getPayments);

export default router;