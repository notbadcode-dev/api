import { Router } from "express";

import { ReorderLinkOnGroup } from "../controllers/link-group.controller";

const linkRoutes = {
  reorderLink: "/reorderLink",
};

const routes = Router();
routes.post(linkRoutes.reorderLink, ReorderLinkOnGroup);

export default routes;
