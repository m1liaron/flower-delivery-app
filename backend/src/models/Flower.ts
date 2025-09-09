import mongoose, { Types } from "mongoose";

const FlowerSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		count: {
			type: Number,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		favorite: {
			type: Boolean,
			required: true,
			default: false,
		},
		shopId: { type: Types.ObjectId, ref: "Shop", required: true },
	},
	{ timestamps: true },
);

const Flower = mongoose.model("Flower", FlowerSchema);

export { Flower };
