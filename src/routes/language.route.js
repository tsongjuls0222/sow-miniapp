const { GetLanguageController } = require("../controllers/language.controller");
const { languageSchema } = require("../schemas/language.schema");
const validate = require("../middlewares/validate");

async function authRoutes(app) {
  app.get(
    "/get",
    {
      preValidation: [validate(languageSchema, "query")]
    },
    GetLanguageController
  );
}

module.exports = authRoutes;