import express from "express";
import { auth, adminOnly } from "../middleware/authMiddleware.js";

import{
    createFlat,
    getFlats,
    updateFlat,
    deleteFlat
} from "../controllers/flatController.js"

const router = express.Router();

router.post("/" , auth, adminOnly, createFlat);
router.get("/", getFlats);
router.put("/:id", updateFlat);
router.delete("/:id", deleteFlat);

export default router;