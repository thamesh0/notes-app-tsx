import {
	createDeckController,
	deleteDeckController,
	getDecksController,
	getDeckByIdController,
} from "../controllers/deckControllers";

import {
	createCardForDeckController,
	deleteCardFromDeckController,
} from "../controllers/cardControllers";

import express from "express";
export const router = express.Router();

// Api Root
router.get("/", (req, res) => {
	res.send("Notes App Server");
});

// fetch all decks & create Deck
router.post("/decks", createDeckController); // Create new Deck
router.get("/decks", getDecksController); // Get all decks in the Db
router.get("/decks/:deckId", getDeckByIdController); // Get all decks in the Db
router.delete("/decks/:deckId/cards/:index", deleteDeckController); // delete Deck

// Cards for Deck Api
router.post("/decks/:deckId/cards", createCardForDeckController); // Create card for a deck
router.delete("/decks/:deckId", deleteCardFromDeckController); // Delete card from deck
