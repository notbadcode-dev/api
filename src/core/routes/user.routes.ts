import { Router } from "express";

import { GetUserById } from "../../controllers/user.controller";

const userRoutes = {
  getById: "/getById/:id",
};

const routes = Router();
routes.get(userRoutes.getById, GetUserById);

export default routes;
