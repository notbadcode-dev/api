import { Router } from "express";

import UserRoutes from "./core/routes/user.routes";

const router = Router();
const api = "/api/notbadcode";
router.use(`${api}/user/`, UserRoutes);

export default router;
