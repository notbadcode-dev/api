import "dotenv/config";

import cors from "cors";
import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { DataSource } from "typeorm";

import { AuthDataSource, LinksDataSource } from "./database";
import { verifyToken } from "./middlewares/auth.middleware";
import AppRoutes from "./routes/index.routes";
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

LinksDataSource.initialize()
  .then((value: DataSource) => {
    console.info("Start database: " + value.options.database);
  })
  .catch((error) => console.error(error));

app.use(
  express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
);

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3200",
};

app.use(cors(corsOptions));

app.options("*", (req, res) => {
  res.status(200);
});

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

app.get("/api/notbadcode", (req, res) => {
  res.status(200).send("NotBadCode API v2.0");
});

app.use(apiBasePath, AppRoutes);

export default app;
