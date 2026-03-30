const fp = require("fastify-plugin");
const cors = require("@fastify/cors");

async function corsPlugin(app) {
  await app.register(cors, {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  });
}

module.exports = fp(corsPlugin);