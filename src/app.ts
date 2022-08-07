import "dotenv/config";

import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";

import { verifyToken } from "./middlewares/auth.middleware";

import AppRoutes from "./routes";
import swaggerDocument from "./swagger";

// Create Express server
const app = express();
const apiBasePath = process.env.BASE_API_PATH?.toString() ?? "/api/notbadcode";

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("strict routing", true);
app.enable("strict routing");
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true }));

app.use(verifyToken);

app.use(
  express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
);
// Swagger
const swaggerOptions = {
  explorer: true,
  customCss: ".swagger-ui .topbar { display: none }",
};
app.use(
  "/api/notbadcode/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerOptions)
);

app.use(apiBasePath, AppRoutes);

export default app;
