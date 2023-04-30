import { Request, Response } from "express";
import Deck from "../models/deck";

export async function createCardForDeckController(req: Request, res: Response) {
	console.log(req.body.cardText);
	const deckId = req.params.deckId;
	const deck = await Deck.findById(deckId); // Find the deck by deckId
	if (!deck) {
		return res.status(400).send("Deck id doesn't exist");
	} else {
		const cardText = req.body.cardText; // this name should the same as the object we send inside in the post Request during API calls
		deck.cards.push(cardText); // Add the card to the deck

		await deck.save(); // Save the changes in the Deck Collection
		res.json(deck.cards);
	}
}

export async function deleteCardFromDeckController(
	req: Request,
	res: Response
) {
	const deckId = req.params.deckId;
	const index = req.params.index;
	const deck = await Deck.findById(deckId);
	if (!deck) return res.status(400).send("no deck of this id exists");
	deck.cards.splice(parseInt(index), 1);
	await deck.save();
	res.json(deck);
}
