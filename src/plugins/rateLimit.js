const fastifyRateLimit = require("@fastify/rate-limit");

async function rateLimitPlugin(app) {
  await app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: "15 minutes"
  });
}

module.exports = {
  rateLimitPlugin
};