import { Router } from "express";

import AuthRoutes from "./routes/auth.routes";
import UserRoutes from "./routes/user.routes";
import LinkRoutes from "./routes/link.routes";
import LinkGrouoRoutes from "./routes/linkGroup.routes";

const router = Router();

router.use(`/auth/`, AuthRoutes);
router.use(`/user/`, UserRoutes);
router.use(`/link/`, LinkRoutes);
router.use(`/linkGroup/`, LinkGrouoRoutes);

export default router;
