import { API_URI } from "./config";
import { Deck } from "../types/types";
export async function getDecksApi(): Promise<Deck[]> {
	const response = await fetch(`${API_URI}/decks`, { method: "GET" });

	return response.json();
}

export async function createDeckApi(title: string): Promise<Deck> {
	const response = await fetch(`${API_URI}/decks`, {
		method: "POST",
		body: JSON.stringify({
			title,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	return response.json();
}

export async function deleteDeckApi(deckId: string): Promise<Deck> {
	const response = await fetch(`${API_URI}/decks/${deckId}`, {
		method: "DELETE",
	});

	return response.json();
}
