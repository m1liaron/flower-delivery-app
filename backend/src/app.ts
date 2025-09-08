import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { connectMongoDB } from "./db/mongodb.js";
import { flowerRoute, orderRoute, shopRoute } from "./routes/index.js";

config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/shops", shopRoute);
app.use("/flowers", flowerRoute);
app.use("/orders", orderRoute);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		await connectMongoDB(process.env.MONGO_URI!);
		app.listen(port, () => {
			console.log(`server running on port https://localhost:${port}`);
		});
	} catch (error) {
		console.error("Error starting server: ", error);
	}
};

start();
