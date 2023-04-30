import React, { ReactHTML, useEffect, useState } from "react";
import { createDeckApi, deleteDeckApi, getDecksApi } from "../api/decks-api";
import { Link } from "react-router-dom";
import { Deck } from "../types/types";

export const Home = () => {
	const [decks, setDecks] = useState<Deck[]>([]);

	const [title, setTitle] = useState("");

	const [error, setError] = useState(false);

	async function fetchDecks() {
		const decks = await getDecksApi();
		setDecks(decks); // Store Decks for Display
	}

	async function handleDeleteDeck(deckId: string) {
		const res = await deleteDeckApi(deckId);
		// Optimisic Updates -
		setDecks(decks.filter((deck) => deck._id !== deckId)); // filter function returns when the condition is false
	}

	async function handleCreateDeck(e: React.ChangeEvent) {
		e.preventDefault();
		if (title && title != "") {
			console.log("creating new deck...");
			const res = await createDeckApi(title);

			// Reset Title & alert
			setTitle("");
			console.log("dont print this");
		} else {
			// Display alert
			setError(true);
		}
	}

	useEffect(() => {
		fetchDecks();

		return () => {
			console.log(decks);
		};
	}, [handleCreateDeck]);

	return (
		// Flex-box centers the entire component
		<div className="Home">
			<h1>Flash Card Decks</h1>
			<div className="decks">
				{decks.map((deck) => (
					<li key={deck._id}>
						<button onClick={() => handleDeleteDeck(deck._id)}>X</button>
						<Link className="deck-title" to={`/decks/${deck._id}`}>
							{deck.title}
						</Link>
					</li>
				))}
			</div>

			{/* separate form & alert span */}
			<div className="form-span">
				<form className="create-deck-form">
					<label htmlFor="title">Deck Title</label>
					<input
						className="input-field"
						type="text"
						value={title}
						id="title"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setTitle(e.target.value);
						}}
					/>
					<button className="submit-button" onClick={() => handleCreateDeck}>
						Create Deck
					</button>
				</form>

				<span className={error ? "alert " : ""}></span>
			</div>
		</div>
	);
};
