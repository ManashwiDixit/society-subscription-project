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
router.get("/", auth, getFlats);
router.put("/:id", auth, adminOnly,  updateFlat);
router.delete("/:id", auth, adminOnly, deleteFlat);

export default router;