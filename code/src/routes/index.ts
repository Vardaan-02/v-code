import { Router } from "express";
import sidebarRoutes from "./sidebar.routes";
import editorRoutes from "./code-editor.routes";

const router = Router();

router.use("/sidebar", sidebarRoutes);
router.use("/editor", editorRoutes);

export default router;
