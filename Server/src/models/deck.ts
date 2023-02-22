import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;

const deckSchema = new Schema({
	title: String, // String is shorthand for {type: String}
	cards: [String],
});

// Defining Deck Model
const deckModel = mongoose.model("Deck", deckSchema, "decks"); // @params - (model_name, model_schema, collection_name)

// Create Decks collection
deckModel.createCollection();

export default deckModel;
