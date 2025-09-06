import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
});

const Shop = mongoose.model("Shop", ShopSchema);

export { Shop };
