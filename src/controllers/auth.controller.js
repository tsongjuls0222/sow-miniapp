const { AuthService, GetUserService, GetLanguageService, LogoutService } = require("../services/auth.service");

async function LoginController(req, response) {
  try {
    const auth_service = await AuthService(req);
    if(!auth_service || auth_service.code !== 1) {
      return response.code(400).send({
        code: 0,
        message: auth_service?.message ?? "Login Failed"
      });
    }

    return response.code(200).send({
      code: 1,
      data: auth_service.data,
      message: "Login Success"
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "LoginController Unknown error";

    return response.code(500).send({
      code: 0,
      message
    });
  }
}

async function GetUserController(req, response) {
  try {
    const user_service = await GetUserService(req);
    if(!user_service || user_service.code !== 1) {
      return response.code(401).send({
        code: 0,
        message: user_service?.message ?? "Login Failed"
      });
    }

    return response.code(200).send({
      code: 1,
      data: user_service.data,
      message: "Get User Success"
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "GetUserController Unknown error";

    return response.code(500).send({
      code: 0,
      message
    });
  }
}

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

async function LogoutController(req, response) {
  try {
    const auth_service = await LogoutService(req);
    if(!auth_service || auth_service.code !== 1) {
      return response.code(400).send({
        code: 0,
        message: auth_service?.message ?? "Logout Failed"
      });
    }

    return response.code(200).send({
      code: 1,
      data: auth_service.data,
      message: "Logout Success"
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "LogoutController Unknown error";

    return response.code(500).send({
      code: 0,
      message
    });
  }
}

module.exports = {
  LoginController,
  GetUserController,
  GetLanguageController,
  LogoutController
};