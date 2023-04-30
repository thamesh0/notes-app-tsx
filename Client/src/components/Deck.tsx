import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createCardApi } from "../api/cards-api";
import { getCardsApi } from "../api/cards-api";

export const Deck = () => {
	const [cards, setCards] = useState<String[]>([]);

	const [cardText, setCardText] = useState("");

	const [error, setError] = useState(false);

	const { deckId } = useParams();

	async function fetchCards() {
		const res = await getCardsApi(deckId!);
		setCards(res);
	}

	async function handleDeleteCard(deckId: string) {
		// const res = await deleteDeckApi(deckId);
		// Optimisic Updates -
		// setCards(cards.filter(card => card._id !== deckId)); // filter function returns when the condition is false
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
					<label htmlFor="title">Deck Title</label>
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
