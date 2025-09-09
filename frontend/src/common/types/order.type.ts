import type { Flower } from "./flower.type";

type Order = {
	_id: string;
	total: number;
	products: Flower[];
	address: string;
	date: Date;
};

export type { Order };
