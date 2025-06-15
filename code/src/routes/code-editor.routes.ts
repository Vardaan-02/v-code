import express from "express";
import getData from "../controllers/code-editor/get-file";
import editFileData from "../controllers/code-editor/edit-file";

const router = express.Router();

router.get("/get-file-data", getData);

router.post("/edit-file-data", editFileData);

export default router;
