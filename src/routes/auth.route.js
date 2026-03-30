const { LoginController, GetUserController } = require("../controllers/auth.controller");
const { loginSchema } = require("../schemas/auth.schema");
const validate = require("../middlewares/validate");
const {authGuard} = require("../middlewares/guard");

async function authRoutes(app) {
  app.post(
    "/login",
    {
      preValidation: [validate(loginSchema, "body")]
    },
    LoginController
  );

  app.get(
    "/user",
    {
      preHandler: [authGuard(true)]
    },
    GetUserController
  );
}

module.exports = authRoutes;