import express from "express";
import {ticketsRoute} from "./routes/tickets.route";

export const app = express();
app.use(express.json());
app.use('/tickets', ticketsRoute);