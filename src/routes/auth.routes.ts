import { Router } from "express";

import { KeepSession, SignIn } from "../controllers/auth.controller";

const userRoutes = {
  sign: "/sign",
  keep: "/keep/:id",
};

const routes = Router();
routes.post(userRoutes.sign, SignIn);
routes.post(userRoutes.keep, KeepSession);

export default routes;
