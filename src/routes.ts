import { Router } from "express";

import { authMiddleware } from "./middlewares/index.middleware";
import AuthRoutes from "./routes/auth.routes";
import UserRoutes from "./routes/user.routes";

const router = Router();

router.use(`/auth/`, AuthRoutes);
router.use(`/user/`, UserRoutes);

export default router;
