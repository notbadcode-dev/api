import { Router } from "express";

import { ReorderLinkOnGroup } from "../controllers/linkGroup.controller";

const linkRoutes = {
  reorderLink: "/reorderLink",
};

const routes = Router();
routes.post(linkRoutes.reorderLink, ReorderLinkOnGroup);

export default routes;
