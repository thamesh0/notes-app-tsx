import { Request, Response } from "express";
import Deck from "../models/deck";

export async function getDecksController(req: Request, res: Response) {
	//  Fetch all cards in the deck
	const decks = await Deck.find(); // Fetches all the decks in Database
	//    console.log(decks); // prints all decks in a db
	res.json(decks);
}
export async function getDeckByIdController(req: Request, res: Response) {
	//  Fetch all cards in the deck
	const deckId = req.params.deckId;
	const deck = await Deck.findById(deckId); // Fetches all the decks in Database

	if (!deck) {
		return res.status(400).send("Deck id Doesn't exist.");
	}
	console.log(deck);
	res.json(deck); // Returns the information of a Single Deck
}

export async function createDeckController(req: Request, res: Response) {
	const newDeck = new Deck({
		title: req.body.title,
	});
	const createdDeck = await newDeck.save();
	res.json(createdDeck);
}

export async function deleteDeckController(req: Request, res: Response) {
	const deckId = req.params.deckId;
	const deletedDeck = await Deck.findByIdAndDelete(deckId);
	res.json(deletedDeck);
}
