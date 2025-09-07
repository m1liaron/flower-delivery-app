import { Router } from "express";
import { createShop, getShops } from "../controllers/shopController.js";

const router = Router();

router.get("/", getShops);
router.post("/", createShop);

export { router as shopRoute };
