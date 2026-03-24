import { createPayment } from "../controllers/paymentController.js";
import { auth, } from "../middleware/authMiddleware.js";

import express from "express";

const router = express.Router();

router.post("/", auth, createPayment);
//  router.get("/", getPayments);

export default router;