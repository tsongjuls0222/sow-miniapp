const Fastify = require("fastify");
const dotenv = require("dotenv");

const { rateLimitPlugin } = require("./plugins/rateLimit");
const corsPlugin = require("./plugins/cors");
const helmetPlugin = require("./plugins/helmet");
const dbPlugin = require("./plugins/db");
const jwtPlugin = require("./plugins/jwt");
const authRoutes = require("./routes/auth.route");
const productRoutes = require("./routes/product.route");

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env.local" });
}

function buildApp() {
  const app = Fastify({
    logger: true,
    disableRequestLogging: true,
    pluginTimeout: 30000
  });

  console.log("[app] buildApp called");

  app.register(corsPlugin);
  app.register(helmetPlugin);
  app.register(rateLimitPlugin);
  app.register(dbPlugin);
  app.register(jwtPlugin);

  app.register(authRoutes, { prefix: "/api/v1/auth" });
  app.register(productRoutes, { prefix: "/api/v1/product" });

  app.setErrorHandler((error, req, reply) => {
    req.log.error({ err: error }, "unhandled_error");

    reply.code(500).send({
      code: 500,
      message: "Internal Server Error"
    });
  });

  return app;
}

module.exports = {
  buildApp
};