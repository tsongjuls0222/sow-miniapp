const fp = require("fastify-plugin");
const cookie = require("@fastify/cookie");

async function cookiePlugin(app) {
  await app.register(cookie, {
    secret: process.env.COOKIE_SECRET
  });
}

module.exports = fp(cookiePlugin, {
  name: "cookie-plugin"
});