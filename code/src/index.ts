import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN , 
  credentials: true, 
}));

app.use(express.json());

import sidebarRoutes from "./routes/sidebar.routes";
app.use("/api/sidebar", sidebarRoutes);

import editorRoutes from "./routes/code-editor.routes";
app.use("/api/editor", editorRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
