import { Router } from "express";

import { CreateUser, GetUserById } from "../controllers/user.controller";

const userRoutes = {
  getById: "/getById/:id",
  createUser: "/createUser",
};

const routes = Router();
routes.get(userRoutes.getById, GetUserById);
routes.post(userRoutes.createUser, CreateUser);

export default routes;
