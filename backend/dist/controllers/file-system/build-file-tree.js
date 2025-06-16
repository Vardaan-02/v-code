"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = build;
const build_tree_1 = require("../../utils/build-tree");
async function build(req, res) {
    const fileTree = await (0, build_tree_1.generateFileTree)(process.env.ACTUAL_PATH);
    res.json({ tree: fileTree });
    return;
}
