import { API_URI } from "./config";

export async function getDecksApi(): Promise<Deck[]> {
	// Promise chaining
	const decks = await fetch(`${API_URI}/get-decks`).then(res => res.json());

	return decks;
}

export async function createDeckApi(title: string): Promise<Deck> {
	const createdDeck = await fetch(`${API_URI}/decks`, {
		method: "POST",
		body: JSON.stringify({
			title,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	}).then(res => res.json());

	return createdDeck;
}

export async function deleteDeckApi(deckId: string): Promise<Deck> {
	const deletedDeck = await fetch(`${API_URI}/decks/${deckId}`, {
		method: "DELETE",
	}).then(res => res.json());

	return deletedDeck;
}
