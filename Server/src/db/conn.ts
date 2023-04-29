import mongoose from "mongoose";
require("dotenv").config({ path: "./.env" });

// ENVs
const username: string = process.env.USERNAME || "";
const password: string = process.env.PASSWORD || "";
const dbname: string = process.env.DB || "";
const uri: string = `mongodb+srv://${username}:${password}@$cluster0.8avj53l.mongodb.net/${dbname}?retryWrites=true&w=majority`;

export async function connecToDatabase() {
	await mongoose
		.set("strictQuery", true)
		.connect(uri)
		.catch((err) => console.error(err));

	const db = mongoose.connection;
	db.once("open", function () {
		console.log("Connected successfully");
	});
}
