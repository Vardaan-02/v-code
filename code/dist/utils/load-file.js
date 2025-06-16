"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFile = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const s3_service_1 = require("../lib/s3-service");
const dummy_data_1 = require("../dummy-data");
dotenv_1.default.config();
const bucket = process.env.AWS_BUCKET_NAME;
const loadFile = async (path) => {
    const { username } = dummy_data_1.user;
    const { name: projectName } = dummy_data_1.project;
    if (!path)
        throw new Error("Missing path");
    const finalPath = `users/${username}/${projectName}/${path}`;
    try {
        const s3Object = await s3_service_1.s3
            .getObject({
            Bucket: bucket,
            Key: finalPath,
        })
            .promise();
        const fileContent = s3Object.Body?.toString("utf-8") ?? "";
        return fileContent;
    }
    catch (error) {
        console.error("❌ Error fetching file from S3:", error);
        throw new Error("Failed to load file");
    }
};
exports.loadFile = loadFile;
