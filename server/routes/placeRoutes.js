import express from "express";
import { createPlace } from "../controllers/placeController.js";

const router = express.Router();

router.post("/place", createPlace);

export default router;
