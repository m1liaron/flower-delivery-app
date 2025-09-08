import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { throwServerError } from "../helpers/throwServerError.js";
import { Shop } from "../models/Shop.js";

const getShops = async (_req: Request, res: Response) => {
	try {
		const shops = await Shop.find();

		res.status(StatusCodes.OK).json(shops);
	} catch (err) {
		throwServerError(res, err);
	}
};

const createShop = async (req: Request, res: Response) => {
	try {
		const { title } = req.body;
		if (title.length === 0) {
			res
				.status(StatusCodes.BAD_REQUEST)
				.json({ error: true, message: "Title is missing" });
			return;
		}
		const newOrder = await Shop.create({ title });

		res.status(StatusCodes.OK).json(newOrder);
	} catch (err) {
		throwServerError(res, err);
	}
};

export { getShops, createShop };
