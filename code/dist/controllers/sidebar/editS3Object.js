"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = editS3Object;
const s3_service_1 = require("../../lib/s3-service");
const dotenv_1 = __importDefault(require("dotenv"));
const dummy_data_1 = require("../../dummy-data");
dotenv_1.default.config();
async function editS3Object(req, res) {
    const { name: project_name } = dummy_data_1.project;
    const bucket = process.env.AWS_BUCKET_NAME;
    const { name, path, username } = req.body;
    if (!name || !path) {
        res.status(400).json({ message: "Missing name or path in request body" });
        return;
    }
    const finalPath = `users/${username}/${project_name}/${path}`;
    const pathSegments = finalPath.split("/");
    pathSegments[pathSegments.length - 1] = name;
    const newKey = pathSegments.join("/");
    try {
        await s3_service_1.s3
            .copyObject({
            Bucket: bucket,
            CopySource: `${bucket}/${finalPath}`,
            Key: newKey,
        })
            .promise();
        await s3_service_1.s3
            .deleteObject({
            Bucket: bucket,
            Key: finalPath,
        })
            .promise();
        res.status(200).json({
            message: "File renamed successfully",
            newPath: newKey,
        });
        return;
    }
    catch (err) {
        console.error("S3 Rename Error:", err);
        res.status(500).json({ message: "Failed to rename file", error: err });
        return;
    }
}
