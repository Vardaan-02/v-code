"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const copy_code_to_local_1 = require("../controllers/code-editor/copy-code-to-local");
const save_file_1 = require("../controllers/code-editor/save-file");
const load_file_1 = require("../controllers/code-editor/load-file");
const auth_middleware_1 = require("../middelware/auth.middleware");
const router = express_1.default.Router();
router.post("/load-file", auth_middleware_1.authenticate, load_file_1.loadFile);
router.post("/save-file", auth_middleware_1.authenticate, save_file_1.saveFile);
router.get("/copy-code", copy_code_to_local_1.copyCodeToLocal);
exports.default = router;
