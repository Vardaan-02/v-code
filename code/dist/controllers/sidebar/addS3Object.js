"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = addS3Object;
const s3_service_1 = require("../../lib/s3-service");
const dummy_data_1 = require("../../dummy-data");
async function addS3Object(req, res) {
    const { username } = dummy_data_1.user;
    const { name } = dummy_data_1.project;
    const { path, type, content } = req.body;
    if (!path || !type) {
        res.status(400).json({ message: "Path and type are required." });
        return;
    }
    const finalPath = `users/${username}/${name}/${path}`;
    const key = type === "folder" ? finalPath.replace(/\/?$/, "/") : finalPath;
    console.log("add:", key);
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: type === "file" ? content || "" : "",
    };
    s3_service_1.s3.putObject(params, (err, data) => {
        if (err) {
            console.error("❌ Error uploading to S3:", err);
            res.status(500).json({ message: "Failed to upload", error: err });
            return;
        }
        res.status(200).json({
            message: `${type} created successfully ✅`,
            key,
            data,
        });
        return;
    });
}
