import { Router } from "express";
import { getFlowers } from "../controllers/flowerController.js";

const router = Router();

router.get("/", getFlowers);

export { router as flowerRoute };
