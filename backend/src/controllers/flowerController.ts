import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { throwServerError } from "../helpers/throwServerError.js";
import { Flower } from "../models/Flower.js";

const getFlowers = async (req: Request, res: Response) => {
	try {
		const shops = await Flower.find();

		res.status(StatusCodes.OK).json(shops);
	} catch (err) {
		throwServerError(res, err);
	}
};

export { getFlowers };
