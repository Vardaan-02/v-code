import express from "express";
import getData from "../controllers/code-editor/get-file";
import editFileData from "../controllers/code-editor/edit-file";
import { copyCodeToLocal } from "../controllers/code-editor/copy-code-to-local";

const router = express.Router();

router.get("/get-file-data", getData);

router.post("/edit-file-data", editFileData);

router.get("/copy-code",copyCodeToLocal);

export default router;
