import cors from "cors";
import express from "express";

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		app.listen(port, () => {
			console.log(`HTTPS server running on port https://localhost:${port}`);
		});
	} catch (error) {
		console.error("Error starting server: ", error);
	}
};

start();
