"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const get_file_1 = __importDefault(require("../controllers/code-editor/get-file"));
const edit_file_1 = __importDefault(require("../controllers/code-editor/edit-file"));
const copy_code_to_local_1 = require("../controllers/code-editor/copy-code-to-local");
const router = express_1.default.Router();
router.get("/get-file-data", get_file_1.default);
router.post("/edit-file-data", edit_file_1.default);
router.get("/copy-code", copy_code_to_local_1.copyCodeToLocal);
exports.default = router;
