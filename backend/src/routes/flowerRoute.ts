import { Router } from "express";
import { createFlower, getFlowers } from "../controllers/flowerController.js";

const router = Router();

router.get("/:shopId", getFlowers);
router.post("/:shopId", createFlower);

export { router as flowerRoute };
