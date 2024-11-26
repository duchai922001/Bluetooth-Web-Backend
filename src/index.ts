import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB";
import { mainRoutes } from "./presentations/routes/main.route";
import { configureSocketIO } from "./config/socket-io";
import http from "http";
dotenv.config();
const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = configureSocketIO(server);
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

connectDB();

mainRoutes(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
