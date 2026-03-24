import express from "express";
import { login ,  createUserFromFlat} from "../controllers/authController.js"
import { auth, adminOnly } from "../middleware/authMiddleware.js";
import { createFlat } from "../controllers/flatController.js";

const router = express.Router();



router.post("/login", login);
router.post("/create-user", createUserFromFlat);
router.post("/flats", auth, adminOnly, createFlat);

export default router;
