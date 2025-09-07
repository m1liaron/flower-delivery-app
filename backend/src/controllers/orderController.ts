import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { throwServerError } from "../helpers/throwServerError.js";
import { Order } from "../models/Order.js";

const getOrders = async (req: Request, res: Response) => {
	try {
		const shops = await Order.find();

		res.status(StatusCodes.OK).json(shops);
	} catch (err) {
		throwServerError(res, err);
	}
};

const createOrder = async (req: Request, res: Response) => {
	try {
		const { total, products, address, date } = req.body;
		const newOrder = await Order.create({ total, products, address, date });

		res.status(StatusCodes.OK).json(newOrder);
	} catch (err) {
		throwServerError(res, err);
	}
};

export { getOrders, createOrder };
