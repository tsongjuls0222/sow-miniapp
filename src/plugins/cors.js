const fp = require("fastify-plugin");
const cors = require("@fastify/cors");

async function corsPlugin(app) {
  await app.register(cors, {
    origin: [
      "http://localhost:5173",
      "https://main.d1nmregmm9djjc.amplifyapp.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  });
}

module.exports = fp(corsPlugin);