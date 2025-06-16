import { Router } from "express";
import sidebarRoutes from "./sidebar.routes";
import editorRoutes from "./code-editor.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/sidebar", sidebarRoutes);
router.use("/editor", editorRoutes);
router.use("/auth", authRoutes);

export default router;
