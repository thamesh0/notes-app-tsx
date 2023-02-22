import React, { useEffect, useState } from "react";
import { createDeckApi, deleteDeckApi, getDecksApi } from "../api/decks-api";
import { Link, useParams } from "react-router-dom";

export const Deck = () => {
	const [cards, setCards] = useState<Deck[]>([]);

	const [cardText, setTitle] = useState("");

	const [isEmpty, setIsEmpty] = useState(false);

	const { deckId } = useParams();

	async function fetchCards() {
		// const decks = await getDecksApi();
		// setDecks(decks); // Store Decks for Display
	}

	async function handleDeleteDeck(deckId: string) {
		const res = await deleteDeckApi(deckId);
		// To maintain Consistency, Either
		// Refetch all data or Optimistic updates
		// Optimisic Updates -
		setCards(cards.filter(deck => deck._id !== deckId)); // filter function returns when the condition is false
	}

	async function handleCreateDeck(e: React.FormEvent) {
		if (cardText && cardText !== "") {
			const res = await createDeckApi(cardText);

			// Reset Title & alert
			setTitle("");
			setIsEmpty(false);
		} else {
			// Display alert
			e.preventDefault();
			setIsEmpty(true);
		}
	}

	useEffect(() => {
		fetchCards();

		return () => {
			console.log("cleanup");
		};
	}, []);

	return (
		// Flex-box centers the entire component
		<div className='Home'>
			<h1>Flash Card Decks</h1>
			<div className='decks'>
				{cards.map(deck => (
					<li key={deck._id}>
						<button onClick={() => handleDeleteDeck(deck._id)}>X</button>
						<Link className='deck-title' to={`/decks/${deck._id}`}>
							{deck.title}
						</Link>
					</li>
				))}
			</div>

			{/* separate form & alert span */}
			<div className='form-span'>
				<form className='create-deck-form' onSubmit={handleCreateDeck}>
					<label htmlFor='title'>Deck Title</label>
					<input
						className='input-field'
						type='text'
						value={cardText}
						id='title'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setTitle(e.target.value);
						}}
					/>
					<button className='submit-button'>Create Deck</button>
				</form>

				<span className={isEmpty ? "alert " : ""}></span>
			</div>
		</div>
	);
};
