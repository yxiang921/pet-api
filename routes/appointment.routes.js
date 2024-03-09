import express from "express";

import { addAppointment, getAppointment } from "../controllers/appointment.controller.js"
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/add",protectRoute, addAppointment);
router.get("/get",protectRoute, getAppointment);


export default router;