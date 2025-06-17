import express from "express";
import editS3Object from "../controllers/sidebar/editS3Object";
import getFolderStructureTree from "../controllers/sidebar/getFolderStructure-tree";
import getFolderStructureList from "../controllers/sidebar/getFolderStructure-list";
import addS3Object from "../controllers/sidebar/addS3Object";
import deleteS3Object from "../controllers/sidebar/deleteS3Object";
import { authenticate } from "../middelware/auth.middleware";

const router = express.Router();

router.get("/get-folder-structure/tree", authenticate, getFolderStructureTree);
router.get("/get-folder-structure/list", authenticate, getFolderStructureList);

router.post("/add-s3-object", authenticate, addS3Object);

router.put("/edit-s3-object", authenticate, editS3Object);

router.put("/delete-s3-object", authenticate, deleteS3Object);

export default router;
