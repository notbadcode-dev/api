import app from "./app";

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), async () => {
  const environmentPort: number = app.get("port");
  const environmentMode: string = app.get("env");

  const apiUrl = `http://localhost:${environmentPort}`;

  console.log(`  App is running at ${apiUrl} in ${environmentMode} mode`);
  console.log("  Press [Ctrl + C] to stop\n");
});

export default server;
