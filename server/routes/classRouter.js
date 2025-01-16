import express from "express";
import {
    getClassesByDate,
    reserveClass,
    getReservations,
    unreserveClass,
} from "../controllers/classController.js";

import { verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.get("/by_date", getClassesByDate);

router.post("/reserve_class", verifyToken, reserveClass);

router.delete("/unreserve_class", verifyToken, unreserveClass);

router.get("/reservations/:class_id", verifyToken, getReservations);

export default router;
