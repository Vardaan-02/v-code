"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sidebar_routes_1 = __importDefault(require("./sidebar.routes"));
const code_editor_routes_1 = __importDefault(require("./code-editor.routes"));
const router = (0, express_1.Router)();
router.use("/sidebar", sidebar_routes_1.default);
router.use("/editor", code_editor_routes_1.default);
exports.default = router;
