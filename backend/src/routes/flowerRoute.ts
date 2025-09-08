import { Router } from "express";
import { createFlower, getFlowers, updateFlower } from "../controllers/flowerController.js";

const router = Router();

router.route("/:shopId").get(getFlowers).post(createFlower);
router.route("/:flowerId").patch(updateFlower);

export { router as flowerRoute };
