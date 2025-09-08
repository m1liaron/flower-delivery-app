import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { throwServerError } from "../helpers/throwServerError.js";
import { Flower } from "../models/Flower.js";

const getFlowers = async (req: Request, res: Response) => {
	try {
		const { shopId } = req.params;
		const shops = await Flower.find({ shopId });

		res.status(StatusCodes.OK).json(shops);
	} catch (err) {
		throwServerError(res, err);
	}
};

const createFlower = async (req: Request, res: Response) => {
	try {
		const {
			params: { shopId },
			body: { title, count, price },
		} = req;
		const newShop = await Flower.create({ title, count, price, shopId });

		res.status(StatusCodes.OK).json(newShop);
	} catch (err) {
		throwServerError(res, err);
	}
};

const updateFlower = async (req: Request, res: Response) => {
	try {
		const { flowerId } = req.params;
		console.log(flowerId)
		const updatedFlower = await Flower.findByIdAndUpdate(flowerId, req.body);
		if (!updatedFlower) {
			res
				.status(StatusCodes.NOT_FOUND)
				.json({ error: true, message: "Flower not found" });
			return;
		}

		res.status(StatusCodes.OK).json(updatedFlower);
	} catch (err) {
		throwServerError(res, err);
	}
}

export { getFlowers, createFlower, updateFlower };
