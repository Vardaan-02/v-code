"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyCodeToLocal = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const s3_service_1 = require("../../lib/s3-service");
const dummy_data_1 = require("../../dummy-data");
const copyCodeToLocal = async (req, res) => {
    const { username } = dummy_data_1.user;
    const { name } = dummy_data_1.project;
    const localDir = path_1.default.resolve(__dirname, process.env.COPY_DIST);
    const finalPath = `users/${username}/${name}/`;
    console.log(`📁 Local target: ${localDir}`);
    console.log(`🌐 S3 prefix: ${finalPath}`);
    try {
        if (fs_1.default.existsSync(localDir)) {
            fs_1.default.rmSync(localDir, { recursive: true, force: true });
            console.log("🗑️ Cleaned up previous local directory");
        }
        const listParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Prefix: finalPath,
        };
        const listedObjects = await s3_service_1.s3.listObjectsV2(listParams).promise();
        if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
            res.status(404).json({ error: "No files found under that prefix." });
            return;
        }
        for (const obj of listedObjects.Contents) {
            const key = obj.Key;
            if (!key || key.endsWith("/"))
                continue;
            const relativePath = key.replace(finalPath, "");
            const localFilePath = path_1.default.join(localDir, relativePath);
            const dirPath = path_1.default.dirname(localFilePath);
            fs_1.default.mkdirSync(dirPath, { recursive: true });
            const getParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key,
            };
            const s3Object = await s3_service_1.s3.getObject(getParams).promise();
            fs_1.default.writeFileSync(localFilePath, s3Object.Body);
            console.log(`✅ Downloaded: ${key} -> ${localFilePath}`);
        }
        res.status(200).json({ message: "✅ Folder downloaded successfully." });
    }
    catch (err) {
        console.error("❌ S3 Download Error:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};
exports.copyCodeToLocal = copyCodeToLocal;
