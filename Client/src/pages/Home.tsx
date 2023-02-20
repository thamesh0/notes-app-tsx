import React, { useEffect, useState } from "react";

type Deck = {
	title: string;
	_id: string;
};
export const Home = () => {
	const [decks, setDecks] = useState<Deck[]>([]);
	const [title, setTitle] = useState("");
	const [isEmpty, setIsEmpty] = useState(false);

	async function fetchDecks() {
		const res = await fetch("http://localhost:5000/get-decks");
		// const newDecks = await res.json();

		// Promise chaining
		const newDecks = await fetch("http://localhost:5000/get-decks").then(res =>
			res.json(),
		);

		setDecks(newDecks);
	}

	useEffect(() => {
		fetchDecks();
		return () => {
			console.log("cleanup");
		};
	}, []);

	async function handleCreateDeck(e: React.FormEvent) {
		e.preventDefault();
		if (title && title !== "") {
			const res = await fetch("http://localhost:5000/decks", {
				method: "POST",
				body: JSON.stringify({
					title,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const deck = await res.json();
			setTitle("");
			setIsEmpty(false);
			setDecks([...decks, deck]);
		} else {
			// alert("Title shouldn't be empty")
			setIsEmpty(true);
		}
	}

	async function handleDeleteDeck(deckId: string) {
		await fetch(`http://localhost:5000/decks/${deckId}`, {
			method: "DELETE",
		});

		// Refetch all data or Optimistic update

		// Optimisic Updates
		setDecks(decks.filter(deck => deck._id !== deckId)); // filter function returns when the condition is false
	}

	return (
		// Flex-box centers the entire component
		<div className='Home'>
			<h1>Flash Card Decks</h1>
			<div className='decks'>
				{decks.map(deck => (
					<li key={deck._id}>
						<button onClick={() => handleDeleteDeck(deck._id)}>X</button>
						{deck.title}
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
						value={title}
						id='title'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							// TODO: Save typed data
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
