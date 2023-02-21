import { Request, Response } from "express";
import Deck from "../models/deck";

export async function getDecksController(req: Request, res: Response) {
	//  Fetch all cards in the deck
	const decks = await Deck.find(); // Fetches all the decks in Database
	//    console.log(decks); // prints all cards in a deck
	res.json(decks);
}

export async function createDeckController(req: Request, res: Response) {
	console.log(req.body);
	const newDeck = new Deck({
		title: req.body.title,
	});
	const createdDeck = await newDeck.save();
	res.json(`Created deck - ${createdDeck}`);
}

export async function deleteDeckController(req: Request, res: Response) {
	const deckId = req.params.deckId;
	const deletedDeck = await Deck.findByIdAndDelete(deckId);
	res.json(deletedDeck);
}
