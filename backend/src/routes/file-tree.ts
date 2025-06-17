import express from "express";
import build from "../controllers/file-system/build-file-tree";
import addLocalObject from "../controllers/file-system/add-file-folder";
import deleteLocalObject from "../controllers/file-system/delete-file-folder";
import writeLocalFile from "../controllers/file-system/write-file";

const router = express.Router();

router.get("/build", build);

router.post("/add-file-folder",addLocalObject);

router.post("/delete-file-folder",deleteLocalObject);

router.post("/s3-backend-mismatch",writeLocalFile)

export default router;
