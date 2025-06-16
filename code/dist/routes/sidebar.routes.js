"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const editS3Object_1 = __importDefault(require("../controllers/sidebar/editS3Object"));
const getFolderStructure_tree_1 = __importDefault(require("../controllers/sidebar/getFolderStructure-tree"));
const getFolderStructure_list_1 = __importDefault(require("../controllers/sidebar/getFolderStructure-list"));
const addS3Object_1 = __importDefault(require("../controllers/sidebar/addS3Object"));
const deleteS3Object_1 = __importDefault(require("../controllers/sidebar/deleteS3Object"));
const router = express_1.default.Router();
router.get("/get-folder-structure/tree", getFolderStructure_tree_1.default);
router.get("/get-folder-structure/list", getFolderStructure_list_1.default);
router.post("/add-s3-object", addS3Object_1.default);
router.put("/edit-s3-object", editS3Object_1.default);
router.put("/delete-s3-object", deleteS3Object_1.default);
exports.default = router;
