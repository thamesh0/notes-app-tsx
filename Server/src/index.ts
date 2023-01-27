import express, { Request,Response} from "express";
import mongoose from 'mongoose'
// import dbo from "./db/conn";
import cors from "cors";
const app = express();

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;


app.get('/hello', (req: Request,res: Response) => {
    res.send("Hello world")
})

app.get('/', (req: Request,res: Response) => {
    res.send("gg")
})


app.listen(port);
console.log(`listening to port ${port}`)

// app.use(cors());
// app.use(express.json());
// app.use(require("./routes/record"));
// // get driver connection
 
// app.listen(port, () => {
//   // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);
 
//   });
//   console.log(`Server is running on port: ${port}`);
// });