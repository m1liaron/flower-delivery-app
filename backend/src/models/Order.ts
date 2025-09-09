import mongoose, { Types } from "mongoose";

const OrderSchema = new mongoose.Schema({
	total: {
		type: Number,
		required: true,
	},
	products: [
		{
			type: Types.ObjectId,
			ref: "Flower",
			required: true,
		},
	],
	address: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
});

const Order = mongoose.model("Order", OrderSchema);

export { Order };
