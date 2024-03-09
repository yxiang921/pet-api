
import express from "express";

import { addReminder, getReminder } from "../controllers/reminder.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/add", protectRoute, addReminder);
router.get("/get", protectRoute, getReminder);

export default router;