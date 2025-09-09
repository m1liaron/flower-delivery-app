import type { Response } from "express";
import { StatusCodes } from "http-status-codes";

const throwServerError = (res: Response, error: any) => {
	if (error instanceof Error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: true, message: error.message });
	}
};

export { throwServerError };
