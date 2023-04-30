import { Deck } from "../types/types";
import { API_URI } from "./config";

// Appends the newCard at the end of cards array and returns cards array from the deck
export async function createCardApi(
	cardText: string,
	deckId: string
): Promise<String[]> {
	console.log(cardText);
	const cardsInDeck = await fetch(`${API_URI}/decks/${deckId}`, {
		method: "POST",
		body: JSON.stringify({
			cardText,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());

	return cardsInDeck;
}

export async function deleteCardApi(
	deckId: string,
	title: string
): Promise<Deck> {
	const deletedCard = await fetch(`${API_URI}/decks/${deckId}`, {
		method: "DELETE",
	}).then((res) => res.json());

	return deletedCard;
}
