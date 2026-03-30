const fp = require("fastify-plugin");
const helmet = require("@fastify/helmet");

async function helmetPlugin(app) {
  await app.register(helmet, {
    global: true,
    contentSecurityPolicy: false
  });
}

module.exports = fp(helmetPlugin);