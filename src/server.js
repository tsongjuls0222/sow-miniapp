const { buildApp } = require("./app");

async function start() {
  try {
    const app = buildApp();
    const port = Number(process.env.PORT || 3000);
    const host = process.env.HOST || "0.0.0.0";

    console.log("[server] starting...");
    console.log("[server] NODE_ENV:", process.env.NODE_ENV);
    console.log("[server] PORT:", port);

    console.log(app.printRoutes());

    await app.listen({ port, host });

    console.log(`[server] running at http://localhost:${port}`);
  } catch (error) {
    console.error("[server] failed to start:", error);
    process.exit(1);
  }
}

start();