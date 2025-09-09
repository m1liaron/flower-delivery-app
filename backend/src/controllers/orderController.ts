import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { throwServerError } from "../helpers/throwServerError.js";
import { Order } from "../models/Order.js";

const getOrders = async (_req: Request, res: Response) => {
	try {
		const orders = await Order.find().populate("products");

		res.status(StatusCodes.OK).json(orders);
	} catch (err) {
		throwServerError(res, err);
	}
};

const getOrderDetails = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const order = await Order.findById(id).populate("products");
		if (!order) {
			res
				.status(StatusCodes.NOT_FOUND)
				.json({ error: true, message: "Order not found" });
			return;
		}

		res.status(StatusCodes.OK).json(order);
	} catch (err) {
		throwServerError(res, err);
	}
};

const createOrder = async (req: Request, res: Response) => {
	try {
		const { total, products, address, date } = req.body;
		const productIds = products.map((p: any) => p._id ?? p);

		const newOrder = await Order.create({
			total,
			products: productIds,
			address,
			date,
		});

		res.status(StatusCodes.OK).json(newOrder.toObject({ getters: true }));
	} catch (err) {
		throwServerError(res, err);
	}
};

export { getOrders, createOrder, getOrderDetails };
