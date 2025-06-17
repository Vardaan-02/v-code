import express from "express";
import { copyCodeToLocal } from "../controllers/code-editor/copy-code-to-local";
import { saveFile } from "../controllers/code-editor/save-file";
import { loadFile } from "../controllers/code-editor/load-file";
import { authenticate } from "../middelware/auth.middleware";

const router = express.Router();

router.post("/load-file", authenticate, loadFile);

router.post("/save-file", authenticate, saveFile);

router.get("/copy-code", copyCodeToLocal);

export default router;
