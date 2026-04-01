
const { findLanguage } = require("../repositories/auth.repository");

async function GetLanguageService(req) {
  try {
    const _body = req.query;

    const find_user = await findLanguage(req.server, _body.code);
    if(!find_user) {
      return {
        code: 0,
        message: "Language not found."
      };
    }

    return {
      code: 1,
      data: find_user
    };

  } catch (error) {
    const message =
      error instanceof Error
        ? `${error.message} "GetLanguageService Unknown error"`
        : "GetLanguageService Unknown error";

    return {
      code: 0,
      message
    };
  }
}

module.exports = { 
  GetLanguageService
};