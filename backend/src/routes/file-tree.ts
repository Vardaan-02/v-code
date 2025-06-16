import express from "express";
import build from "../controllers/file-system/build-file-tree";
import addLocalObject from "../controllers/file-system/add-file-folder";
import deleteLocalObject from "../controllers/file-system/delete-file-folder";

const router = express.Router();

router.get("/build", build);

router.post("/add-file-folder",addLocalObject);

router.post("/delete-file-folder",deleteLocalObject);

export default router;
