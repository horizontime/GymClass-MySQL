import express from "express";
import {
    home,
    getDaysRemaining,
    updateUserProfile,
    getUserProfile,
    getClassAttendance,
} from "../controllers/userController.js";

import { verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.get("/home", verifyToken, home);

router.get("/days_remaining", verifyToken, getDaysRemaining);

router.put("/profile", verifyToken, updateUserProfile);

router.get("/profile", verifyToken, getUserProfile);

router.get("/profile/attendance", verifyToken, getClassAttendance);

export default router;
