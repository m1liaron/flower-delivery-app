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
		const { shopId } = req.params;
		const shops = await Flower.find({ shopId });

		res.status(StatusCodes.OK).json(shops);
	} catch (err) {
		throwServerError(res, err);
	}
};

export { getFlowers, createFlower };
