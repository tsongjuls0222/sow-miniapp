const { LoginController, GetUserController, GetLanguageController, LogoutController, RefreshController } = require("../controllers/auth.controller");
const { loginSchema, languageSchema } = require("../schemas/auth.schema");
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

  app.post(
    "/refresh",
    RefreshController
  );

  app.post(
    "/logout",
    LogoutController
  );

  app.get(
    "/profile",
    {
      preHandler: [authGuard(true)]
    },
    GetUserController
  );

  app.get(
    "/language",
    {
      preValidation: [validate(languageSchema, "query")]
    },
    GetLanguageController
  );
}

module.exports = authRoutes;