"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getData;
const dotenv_1 = __importDefault(require("dotenv"));
const s3_service_1 = require("../../lib/s3-service");
const dummy_data_1 = require("../../dummy-data");
dotenv_1.default.config();
const bucket = process.env.AWS_BUCKET_NAME;
async function getData(req, res) {
    const { username } = dummy_data_1.user;
    const { name } = dummy_data_1.project;
    const path = req.query.path;
    if (!path) {
        res.status(400).json({ error: "Missing path in query params" });
        return;
    }
    const finalPath = `users/${username}/${name}/${path}`;
    try {
        const s3Object = await s3_service_1.s3
            .getObject({
            Bucket: bucket,
            Key: finalPath,
        })
            .promise();
        const fileContent = s3Object.Body?.toString("utf-8") ?? "";
        res.status(200).json({ content: fileContent });
        return;
    }
    catch (error) {
        console.error("Error fetching file from S3:", error);
        res.status(500).json({ error: "Failed to load file" });
    }
}
