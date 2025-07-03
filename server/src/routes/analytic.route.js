import express from "express";
import { adminRoute, protectRoute } from "../middleware.js/auth.middleware.js";
import { analytics } from "../controllers/analytic.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, analytics);

export default router;
