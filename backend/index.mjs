import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import "./loadEnvironment.mjs";
import "express-async-errors";
import songs from "./routes/songs.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

// Load the /songs routes
app.use("/songs", songs);

// Global error handling
app.use((err, _req, res, next) => {
    console.log(err);
    res.status(500).send("Uh oh. An error occured.")
})

// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});