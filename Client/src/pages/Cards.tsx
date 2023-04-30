import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createCardApi } from "../api/cards-api";
import { getDeckByIdApi } from "../api/decks-api";

export const Cards = () => {
	const [cards, setCards] = useState<String[]>([]);

	const [cardText, setCardText] = useState("");

	const [error, setError] = useState(false);

	const { deckId } = useParams();

	async function fetchCards() {
		const res = await getDeckByIdApi(deckId!);
		setCards(res.cards);
	}

	async function handleDeleteCard(cardText: string) {
		// const res = await deleteDeckApi(deckId);
		// Optimisic Updates -
		setCards(cards.filter((card) => card)); // filter function returns when the condition is false
	}

	async function handleCreateCard(e: React.FormEvent) {
		e.preventDefault();
		if (cardText && cardText != "") {
			const newCard = await createCardApi(cardText, deckId!);
			console.log(newCard);
			setCards([...cards, newCard]);
			// Reset Input field & alert
			setCardText("");
		} else {
			// Display alert

			setError(true);
		}
	}

	useEffect(() => {
		(async function getMyDecks() {
			await fetchCards();
		})();

		return () => {
			console.log(cards);
		};
	}, []);

	return (
		// Flex-box centers the entire component
		<div className="Home">
			<h1>Cards</h1>
			<div className="decks">
				{cards.map((card, i) => (
					<li key={i}>
						<button onClick={() => handleDeleteCard(deckId!)}>X</button>
						{card}
					</li>
				))}
			</div>

			{/* separate form & alert span */}
			<div className="form-span">
				<form className="create-deck-form" onSubmit={handleCreateCard}>
					<label htmlFor="title">Card Text</label>
					<input
						className="input-field"
						type="text"
						value={cardText}
						id="title"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setCardText(e.target.value);
						}}
					/>
					<button className="submit-button">Add Card</button>
				</form>

				<span className={error ? "alert " : ""}></span>
			</div>
		</div>
	);
};
