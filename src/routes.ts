import { Router } from "express";

import AuthRoutes from "./routes/auth.routes";
import UserRoutes from "./routes/user.routes";

const router = Router();
const api = "/api/notbadcode";

router.use(`${api}/auth/`, AuthRoutes);
router.use(`${api}/user/`, UserRoutes);

export default router;
