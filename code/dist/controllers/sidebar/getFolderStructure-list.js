"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getFolderStructureList;
const s3_service_1 = require("../../lib/s3-service");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function getFolderStructureList(req, res) {
    const { username } = req.body;
    const bucket = process.env.AWS_BUCKET_NAME;
    const prefix = `users/${username}/VCode`;
    try {
        const data = await s3_service_1.s3
            .listObjectsV2({
            Bucket: bucket,
            Prefix: prefix,
        })
            .promise();
        const contents = data.Contents;
        if (!contents) {
            res.json([]);
            return;
        }
        const final = contents.map((obj) => {
            const parts = obj.Key.split("/").slice(3);
            return {
                key: parts.join("/"),
                lastModified: obj.LastModified,
                size: obj.Size,
            };
        });
        res.json(final);
    }
    catch (err) {
        console.error("Error fetching S3 folder structure:", err);
        res.status(500).json({ error: "Failed to get S3 folder structure" });
    }
}
