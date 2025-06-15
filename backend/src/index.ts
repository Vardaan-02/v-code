import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN , 
  credentials: true, 
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Hello from Express + TypeScript backend!");
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
