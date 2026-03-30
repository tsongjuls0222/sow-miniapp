const fp = require("fastify-plugin");
const fastifyJwt = require("@fastify/jwt");

async function jwtPlugin(app) {
  await app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET,
    sign: {
      expiresIn: "1h"
    }
  });

  app.decorate("generateToken", (user) => {
    const payload = {
      id: user.id,
      email: user.email
    };

    return app.jwt.sign(payload);
  });
}

module.exports = fp(jwtPlugin, {
  name: "jwt-plugin"
});