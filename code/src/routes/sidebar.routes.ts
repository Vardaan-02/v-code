import express from "express";
import editS3Object from "../controllers/sidebar/editS3Object";
import getFolderStructureTree from "../controllers/sidebar/getFolderStructure-tree";
import getFolderStructureList from "../controllers/sidebar/getFolderStructure-list";
import addS3Object from "../controllers/sidebar/addS3Object";
import deleteS3Object from "../controllers/sidebar/deleteS3Object";

const router = express.Router();

router.get("/get-folder-structure/tree", getFolderStructureTree);
router.get("/get-folder-structure/list", getFolderStructureList);

router.post("/add-s3-object", addS3Object);

router.put("/edit-s3-object", editS3Object);

router.put("/delete-s3-object", deleteS3Object);


export default router;
