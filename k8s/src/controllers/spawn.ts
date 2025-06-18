import fs from "fs";
import path from "path";
import YAML from "yaml";
import { Request, Response } from "express";
import { coreV1Api, k8sApi } from "../k8s-client";

const sanitize = (input: string) =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/^-+|-+$/g, "");

export const handleSpawn = async (req: Request, res: Response) => {
  const { username: rawUsername } = req.body;

  if (!rawUsername) {
    res.status(400).json({ error: "username is required" });
    return;
  }

  const username = sanitize(rawUsername);
  const deploymentName = `user-${username}`;

  const serviceName = `${deploymentName}-svc`;

  const deploymentYamlPath = path.join(
    __dirname,
    "..",
    "k8s",
    "deployment.yaml"
  );
  const serviceYamlPath = path.join(__dirname, "..", "k8s", "service.yaml");

  try {
    // Load and template deployment YAML
    let deploymentFile = fs.readFileSync(deploymentYamlPath, "utf8");
    const populatedYaml = deploymentFile
      .replace(/{{USERNAME}}/g, username)
      .replace(/{{S3_PATH}}/g, `v-code/users/${rawUsername}/VCode/`)

    const deploymentManifest = YAML.parse(populatedYaml);

    const deployResponse = await k8sApi.createNamespacedDeployment({
      namespace: "default",
      body: deploymentManifest,
    });
    console.log(`✅ Deployment created: ${deploymentName}`);
    
    res.status(201).json({
      message: "Deployment created 🎉",
      deployment: deployResponse,
    });
  } catch (err) {
    console.error("❌ Error during spawn:", err);
    res.status(500).json({ error: "Failed to create deployment/service" });
  }
};
