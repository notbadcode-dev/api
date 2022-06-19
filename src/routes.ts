import { Router } from "express";

import { authMiddleware } from "./middlewares/index.middleware";
import AuthRoutes from "./routes/auth.routes";
import UserRoutes from "./routes/user.routes";
import LinksRoutes from "./routes/links.routes";

const router = Router();

router.use(`/auth/`, AuthRoutes);
router.use(`/user/`, UserRoutes);
router.use(`/links/`, LinksRoutes);

export default router;
