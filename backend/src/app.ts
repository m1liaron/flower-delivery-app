import cors from "cors";
import { config } from "dotenv";
import express from "express";
import fetch from "node-fetch";
import { connectMongoDB } from "./db/mongodb.js";
import { flowerRoute, orderRoute, shopRoute } from "./routes/index.js";

config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/shops", shopRoute);
app.use("/flowers", flowerRoute);
app.use("/orders", orderRoute);

app.get("/api/geocode", async (req, res) => {
	const { q, lat, lon } = req.query;

	try {
		let url = "";

		if (q) {
			url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q as string)}`;
		} else if (lat && lon) {
			url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
		} else {
			return res.status(400).json({ error: "Provide either q or lat+lon" });
		}

		const response = await fetch(url, {
			headers: { "User-Agent": "flower-delivery-app/1.0" },
		});

		const data = await response.json();
		res.json(data);
	} catch (err) {
		console.error("Geocoding error:", err);
		res.status(500).json({ error: "Geocoding failed" });
	}
});

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
