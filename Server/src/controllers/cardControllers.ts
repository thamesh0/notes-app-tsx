import { Request, Response } from "express";
import Deck from "../models/deck";

export async function createCardForDeckController(req: Request, res: Response) {
	const deckId = req.params;
	const deck = Deck.findById(deckId);
	if (deck) {
		const cardText = req.body;
		deck.cards.push(cardText);
		await deck.save();
		res.json(deck);
	} else {
		return res.status(400).send("Deck id Doesn't exist.");
	}
}

export async function getCardsForDeckController(req: Request, res: Response) {
	//  Fetch all cards in the deck
	// const decks = await Deck.find(); // Fetches all the decks in Database
	//    console.log(decks); // prints all decks in a db
	// res.json(decks);
}
