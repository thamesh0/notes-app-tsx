import express from "express";
import { Router } from "./routes/routes";
import cors from "cors";
import { connecToDatabase } from "./db/conn";

require("dotenv").config({ path: "./.env" });

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: "https://https://notes-app-tsx.vercel.app",
		credentials: true,
	})
);
app.use(Router);
const port: string = process.env.PORT || "3000";

// Run the server
app.listen(port, async () => {
	// perform Database connection when the server starts
	await connecToDatabase(); // Run model
	console.log(`listening to port ${port}`);
});

// Server Api Endpoints
// Decks Api
