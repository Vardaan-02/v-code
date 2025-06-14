import express from "express";
// import addS3Object from "../controllers/sidebar/addS3Object";
// import deleteS3Object from "../controllers/sidebar/deleteS3Object";
// import editS3Object from "../controllers/sidebar/editS3Object";
import { getFolderStructure } from "../controllers/sidebar/getFolderStructure";

const router = express.Router();

router.get("/get-folder-structure", getFolderStructure);

// router.post("/add-s3-object", addS3Object);

// router.delete("/delete-s3-object", deleteS3Object);

// router.put("/edit-s3-object", editS3Object);

export default router;
