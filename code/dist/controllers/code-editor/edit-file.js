"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = editFileData;
const dotenv_1 = __importDefault(require("dotenv"));
const s3_service_1 = require("../../lib/s3-service");
const dummy_data_1 = require("../../dummy-data");
dotenv_1.default.config();
async function editFileData(req, res) {
    const { username } = dummy_data_1.user;
    const { name } = dummy_data_1.project;
    const { path, content } = req.body;
    if (!path) {
        res.status(400).json({ message: "Missing path or content" });
        return;
    }
    const finalPath = `users/${username}/${name}/${path}`;
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: finalPath,
        Body: content,
        ContentType: "text/plain",
    };
    try {
        await s3_service_1.s3.putObject(params).promise();
        res.status(200).json({ message: "✅ File updated successfully" });
        return;
    }
    catch (error) {
        console.error("❌ Error uploading to S3:", error);
        res.status(500).json({ message: "Failed to update file on S3" });
        return;
    }
}
