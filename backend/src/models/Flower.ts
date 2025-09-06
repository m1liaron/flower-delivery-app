import mongoose, { Types } from "mongoose";

const FlowerSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	count: {
		type: Number,
		required: true,
	},
	shopId: { type: Types.ObjectId, ref: "Shop", required: true },
});

const Flower = mongoose.model("Flower", FlowerSchema);

export { Flower };
