import express from "express";

import { addPet } from "../controllers/pet.controller.js"
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/add",protectRoute, addPet);

export default router;