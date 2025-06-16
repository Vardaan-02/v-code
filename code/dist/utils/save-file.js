"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFile = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const s3_service_1 = require("../lib/s3-service");
const dummy_data_1 = require("../dummy-data");
dotenv_1.default.config();
const bucket = process.env.AWS_BUCKET_NAME;
const saveFile = async (path, content) => {
    if (!path) {
        throw new Error("Missing path or content");
    }
    const { username } = dummy_data_1.user;
    const { name: projectName } = dummy_data_1.project;
    const finalPath = `users/${username}/${projectName}/${path}`;
    const params = {
        Bucket: bucket,
        Key: finalPath,
        Body: content,
        ContentType: "text/plain",
    };
    try {
        await s3_service_1.s3.putObject(params).promise();
        console.log(`✅ File updated: ${finalPath}`);
    }
    catch (error) {
        console.error("❌ Error uploading to S3:", error);
        throw new Error("Failed to update file on S3");
    }
};
exports.saveFile = saveFile;
