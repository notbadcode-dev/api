import app from "./app";

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), async () => {
  console.log(
    `  App is running at http://localhost:${app.get("port")} in ${app.get(
      "env"
    )} mode`
  );
  console.log("  Press [Ctrl + C] to stop\n");
});

export default server;
