import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {
	createDeckController,
	deleteDeckController,
	getDecksController,
} from "./controllers/deckControllers";

require("dotenv").config({ path: "./.env" });

const app = express();
app.use(cors());
app.use(express.json());

// ENVs
const port: string = process.env.PORT || "3000";
const uri: string = process.env.MONGO_URI || "";

// Connect to Database & Run the server
const db: Promise<void> = mongoose
	.set("strictQuery", false)
	.connect(uri)
	.then(() => {
		app.listen(port, () => {
			console.log(`listening to port ${port}`);
		});
	});

// Server Api Endpoints
// Decks Api
app.get("/get-decks", getDecksController);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);
// Cards for Deck Api
