import { Router } from "express";

import { KeepSession, SignIn } from "../controllers/auth.controller";

const authRoutes = {
  sign: "/sign",
  keep: "/keep/:id",
};

const routes = Router();
routes.post(authRoutes.sign, SignIn);
routes.post(authRoutes.keep, KeepSession);

export default routes;
