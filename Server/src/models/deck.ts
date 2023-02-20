import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const deckSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
});

const deckModel = mongoose.model("Deck",deckSchema, "decks")

export default deckModel;