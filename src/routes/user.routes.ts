import { Router } from "express";

import { Create, GetUserById, Update } from "../controllers/user.controller";

const userRoutes = {
  getById: "/getById/:id",
  create: "/create",
  update: "/update",
};

const routes = Router();
routes.get(userRoutes.getById, GetUserById);
routes.post(userRoutes.create, Create);
routes.put(userRoutes.update, Update);

export default routes;
