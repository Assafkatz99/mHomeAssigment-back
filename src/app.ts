import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectToDB } from "./connections";
import routes from "./routes/index";
import { startSocketServer } from "./sockets/socketService";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());

app.use(routes);

const server = app.listen(8000, () => console.log("Listening on port 8000"));

connectToDB();

startSocketServer(server);


