import { Router } from "express";
import { createOrder, getOrderDetails, getOrders } from "../controllers/orderController.js";

const router = Router();

router.get("/", getOrders);
router.get("/:id", getOrderDetails);
router.post("/", createOrder);

export { router as orderRoute };
