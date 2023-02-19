import express, { Request,Response } from "express";
import mongoose from 'mongoose'
import Deck from './models/deck';
import cors from "cors";
require("dotenv").config({ path: "./config.env" });

const app = express();
app.use(cors());
app.use(express.json())

const port = process.env.PORT || 3000;
const uri = process.env.API_URI || "";



app.get('/hello', (req: Request,res: Response) => {
    res.send("Hello world")
})

app.get('/', (req: Request,res: Response) => {
    res.send("gg")
})

app.post('/decks',async (req: Request, res: Response)=> {
    console.log(req.body)
    const newDeck = new Deck(req.body);
    const createdDeck =  await newDeck.save();
    res.json(createdDeck);
})

const db = mongoose.set('strictQuery',false).connect(uri).then(() => {
    app.listen(port, () => {
        console.log(`listening to port ${port}`)
    });
})