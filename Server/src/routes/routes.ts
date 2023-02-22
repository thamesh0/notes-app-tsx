import {
	createDeckController,
	deleteDeckController,
	getDecksController,
} from "../controllers/deckControllers";

import {
	createCardForDeckController,
	getCardsForDeckController,
} from "../controllers/cardControllers";

import express from "express";
export const Router = express.Router();

// fetch all decks & create Deck
Router.get("/decks", getDecksController);
Router.post("/decks", createDeckController);
// Get all cards inside a deck & Create card for a deck
Router.get("/decks/:deckId", getCardsForDeckController);
// delete Deck
Router.delete("/decks/:deckId", deleteDeckController);

// Cards for Deck Api
// app.post("/decks/deckId/cards", createCardForDeckController);
