import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { throwServerError } from "../helpers/throwServerError.js";
import { Shop } from "../models/Shop.js";

const getShops = async (req: Request, res: Response) => {
	try {
		const shops = await Shop.find();

		res.status(StatusCodes.OK).json(shops);
	} catch (err) {
		throwServerError(res, err);
	}
};

export { getShops };
