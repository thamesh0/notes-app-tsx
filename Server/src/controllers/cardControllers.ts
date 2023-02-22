import { Request, Response } from "express";
import Deck from "../models/deck";

export async function createCardForDeckController(req: Request, res: Response) {
	const deckId = req.params.deckId;
	const deck = await Deck.findById(deckId); // Find the deck by deckId
	if (!deck) {
	} else {
		const cardText = req.body.cardText; // this name should the same as the object we send inside in the post Request during API calls
		deck.cards.push(cardText); // Add the card to the deck

		await deck.save(); // Save the changes in the Deck Collection
		res.json(deck.cards);
	}
}

export async function getCardsForDeckController(req: Request, res: Response) {
	//  Fetch all cards in the deck
	const deckId = req.params.deckId;
	const deck = await Deck.findById(deckId); // Fetches all the decks in Database

	if (!deck) {
		return res.status(400).send("Deck id Doesn't exist.");
	}
	console.log(deck); // prints all cards in the deck
	res.json(deck.cards);
}

export async function deleteCardFromDeckController(
	req: Request,
	res: Response,
) {
	const deckId = req.params.deckId;
	const deletedDeck = await Deck.findByIdAndDelete(deckId);
	res.json(deletedDeck);
}
