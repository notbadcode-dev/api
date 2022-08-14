import { Router } from "express";

import AuthRoutes from "./auth.routes";
import LinkRoutes from "./link.routes";
import LinkGrouoRoutes from "./link-group.routes";
import UserRoutes from "./user.routes";

const router = Router();

router.use(`/auth/`, AuthRoutes);
router.use(`/user/`, UserRoutes);
router.use(`/link/`, LinkRoutes);
router.use(`/linkGroup/`, LinkGrouoRoutes);

export default router;
