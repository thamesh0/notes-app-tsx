import {
	createDeckController,
	deleteDeckController,
	getDecksController,
} from "../controllers/deckControllers";

import {
	createCardForDeckController,
	deleteCardFromDeckController,
	getCardsForDeckController,
} from "../controllers/cardControllers";

import express from "express";
export const Router = express.Router();

// fetch all decks & create Deck
Router.post("/decks", createDeckController); // Create new Deck
Router.get("/decks", getDecksController); // Get all decks in the Db
Router.delete("/decks/:deckId", deleteDeckController); // delete Deck

// Cards for Deck Api
Router.post("/decks/:deckId", createCardForDeckController); // Create card for a deck
Router.get("/decks/:deckId", getCardsForDeckController); // Get all cards inside a deck
Router.delete("/decks/:deckId", deleteCardFromDeckController); // Delete card from deck
