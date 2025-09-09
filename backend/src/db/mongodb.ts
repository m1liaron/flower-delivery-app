import mongoose from "mongoose";

const connectMongoDB = async (url: string) => {
	try {
		await mongoose.connect(url);
		console.log("Connected to MongoDB");
	} catch (err) {
		console.error("MongoDB connection error:", err);
		throw err;
	}
};

export { connectMongoDB };
