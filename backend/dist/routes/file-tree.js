"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const build_file_tree_1 = __importDefault(require("../controllers/file-system/build-file-tree"));
const add_file_folder_1 = __importDefault(require("../controllers/file-system/add-file-folder"));
const delete_file_folder_1 = __importDefault(require("../controllers/file-system/delete-file-folder"));
const router = express_1.default.Router();
router.get("/build", build_file_tree_1.default);
router.post("/add-file-folder", add_file_folder_1.default);
router.post("/delete-file-folder", delete_file_folder_1.default);
exports.default = router;
