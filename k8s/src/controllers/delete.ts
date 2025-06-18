import { Request, Response } from "express";
import { k8sApi, coreV1Api } from "../k8s-client";

const sanitize = (input: string) =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/^-+|-+$/g, "");

export const handleDelete = async (req: Request, res: Response) => {
  const { username: rawUsername } = req.body;

  if (!rawUsername) {
    res.status(400).json({ error: "username is required" });
    return;
  }

  const username = sanitize(rawUsername);

  const deploymentName = `user-${username}`;
  const serviceName = `${deploymentName}-svc`;

  try {
    const deleteDeployment = await k8sApi.deleteNamespacedDeployment({
      name: deploymentName,
      namespace: "default",
    });
    console.log(`🗑️ Deployment deleted: ${deploymentName}`);
    
    res.status(200).json({
      message: `Deployment for ${username} deleted successfully`,
      deployment: deleteDeployment,
    });
  } catch (err: any) {
    console.error("❌ Error during deletion:", err.body || err);
    res.status(500).json({
      error: `Failed to delete deployment/service for: ${username}`,
      reason: err.body?.message || err.message,
    });
  }
};
