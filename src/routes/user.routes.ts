import { Router } from "express";

import { RouteConstants } from "../constants/route.constant";
import { UserController } from "../controllers/user.controller";

const routes = Router();
const userController: UserController = new UserController();

routes.get(RouteConstants.user.getUser, userController.GetUser);
routes.get(RouteConstants.user.getById, userController.GetUserById);
routes.post(RouteConstants.user.create, userController.Create);
routes.put(RouteConstants.user.update, userController.Update);

export default routes;
