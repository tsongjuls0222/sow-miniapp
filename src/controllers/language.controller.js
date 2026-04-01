const { GetLanguageService } = require("../services/language.service");

async function GetLanguageController(req, response) {
  try {
    const language_service = await GetLanguageService(req);
    if(!language_service || language_service.code !== 1) {
      return response.code(401).send({
        code: 0,
        message: language_service?.message ?? "Get Language Failed"
      });
    }

    return response.code(200).send({
      code: 1,
      data: language_service.data,
      message: "Get Language Success"
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "GetLanguageController Unknown error";

    return response.code(500).send({
      code: 0,
      message
    });
  }
}

module.exports = {
  GetLanguageController
};