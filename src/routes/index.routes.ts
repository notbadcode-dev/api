import { Router } from "express";

import { RouteConstants } from "../constants/route.constant";
import AuthRoutes from "./auth.routes";
import LinkRoutes from "./link.routes";
import LinkGroupRoutes from "./link-group.routes";
import UserRoutes from "./user.routes";

const router = Router();

router.use(RouteConstants.auth.path, AuthRoutes);
router.use(RouteConstants.user.path, UserRoutes);
router.use(RouteConstants.link.path, LinkRoutes);
router.use(RouteConstants.linkGroup.path, LinkGroupRoutes);

export default router;
