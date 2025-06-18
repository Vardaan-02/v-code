import { Router } from "express";
import { handleSpawn } from "../controllers/spawn";
import { handleDelete } from "../controllers/delete";
import { handleProxy } from "../controllers/centeral-router";

const router = Router();

router.post("/spawn", handleSpawn);
router.post("/delete", handleDelete);
router.use("/:username/:port/", handleProxy);

export default router;
