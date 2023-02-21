import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Deck from "./models/deck";
import cors from "cors";
require("dotenv").config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI || "";

app.get("/get-decks", async (req: Request, res: Response) => {
	//  Fetch all cards in the deck
	const decks = await Deck.find(); // Fetches all the cards in a deck
	//    console.log(decks); // prints all cards in a deck
	res.json(decks);
});

app.post("/decks", async (req: Request, res: Response) => {
	console.log(req.body);
	const newDeck = new Deck({
		title: req.body.title,
	});
	const createdDeck = await newDeck.save();
	res.json(`Created deck - ${createdDeck}`);
});

app.delete("/decks/:deckId", async (req: Request, res: Response) => {
	const deckId = req.params.deckId;
	const deletedDeck = await Deck.findByIdAndDelete(deckId);
	res.json(deletedDeck);
});

const db = mongoose
	.set("strictQuery", false)
	.connect(uri)
	.then(() => {
		app.listen(port, () => {
			console.log(`listening to port ${port}`);
		});
	});
