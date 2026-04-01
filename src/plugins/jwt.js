const fp = require("fastify-plugin");
const fastifyJwt = require("@fastify/jwt");

async function jwtPlugin(app) {
  await app.register(fastifyJwt, {
    secret: process.env.JWT_ACCESS_SECRET
  });

  app.decorate("generateAccessToken", (user, sessionId) => {
    const payload = {
      userId: user.id,
      email: user.email,
      sessionId,
      type: "access"
    };

    return app.jwt.sign(payload, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m"
    });
  });

  app.decorate("generateRefreshToken", (user, sessionId) => {
    const payload = {
      userId: user.id,
      sessionId,
      type: "refresh"
    };

    return app.jwt.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d"
    });
  });

  app.decorate("verifyAccessToken", async (token) => {
    return app.jwt.verify(token, {
      secret: process.env.JWT_ACCESS_SECRET
    });
  });

  app.decorate("verifyRefreshToken", async (token) => {
    return app.jwt.verify(token, {
      secret: process.env.JWT_REFRESH_SECRET
    });
  });
}

module.exports = fp(jwtPlugin, {
  name: "jwt-plugin"
});