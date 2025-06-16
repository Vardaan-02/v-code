"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = deleteS3Object;
const s3_service_1 = require("../../lib/s3-service");
const dotenv_1 = __importDefault(require("dotenv"));
const dummy_data_1 = require("../../dummy-data");
dotenv_1.default.config();
async function deleteS3Object(req, res) {
    const { username } = dummy_data_1.user;
    const { name: project_name } = dummy_data_1.project;
    const bucket = process.env.AWS_BUCKET_NAME;
    const { path, type } = req.body;
    if (!path) {
        res.status(400).json({ message: "Missing name or path in request body" });
        return;
    }
    if (type === "file") {
        const finalPath = `users/${username}/${project_name}/${path}`;
        console.log(finalPath);
        try {
            const head = await s3_service_1.s3
                .headObject({ Bucket: bucket, Key: finalPath })
                .promise()
                .catch(() => null);
            if (!head) {
                console.warn("⚠️ File not found in S3:", finalPath);
            }
            await s3_service_1.s3
                .deleteObject({
                Bucket: bucket,
                Key: finalPath,
            })
                .promise();
            console.log(`✅ Deleted: ${finalPath}`);
            res.status(200).json({
                message: "File delete successfully",
            });
            return;
        }
        catch (err) {
            console.log("path : " + finalPath);
            console.error("S3 Rename Error:", err);
            res.status(500).json({ message: "Failed to rename file", error: err });
            return;
        }
    }
    else {
        try {
            const finalPrefix = `users/${username}/${project_name}/${path}`.replace(/\/+$/, "") + "/";
            const listedObjects = await s3_service_1.s3
                .listObjectsV2({ Bucket: bucket, Prefix: finalPrefix })
                .promise();
            if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
                res.status(404).json({ message: "No objects found under folder" });
                return;
            }
            const deleteParams = {
                Bucket: bucket,
                Delete: {
                    Objects: listedObjects.Contents.map(({ Key }) => ({ Key: Key })),
                },
            };
            await s3_service_1.s3.deleteObjects(deleteParams).promise();
            res.status(200).json({
                message: `✅ Folder and its contents deleted successfully`,
                deleted: deleteParams.Delete.Objects,
            });
        }
        catch (err) {
            console.error("❌ S3 folder delete error:", err);
            res.status(500).json({ message: "Failed to delete folder", error: err });
        }
    }
}
