import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 3000;

// MongoDB conection
connectDB();

// Routes
import userRoutes from "./routes/userRoutes.js";
app.use("/api/users", userRoutes);
import articleRoutes from "./routes/articleRoutes.js";
app.use("/api/articles", articleRoutes);

// Server
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});