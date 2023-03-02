import { Router } from "express";

import { RouteConstants } from "../constants/route.constant";
import { AuthController } from "../controllers/auth.controller";

const routes = Router();
const authController: AuthController = new AuthController();

routes.post(RouteConstants.auth.sign, authController.SignIn);
routes.post(RouteConstants.auth.keep, authController.KeepSession);

export default routes;
