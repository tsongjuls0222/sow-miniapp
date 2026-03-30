const { AuthService, GetUserService } = require("../services/auth.service");

async function LoginController(req, response) {
  try {
    const auth_service = await AuthService(req);
    if(!auth_service || auth_service.code !== 1) {
      return response.code(401).send({
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
    const auth_service = await GetUserService(req);
    if(!auth_service || auth_service.code !== 1) {
      return response.code(401).send({
        code: 0,
        message: auth_service?.message ?? "Login Failed"
      });
    }

    return response.code(200).send({
      code: 1,
      data: auth_service.data,
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

module.exports = {
  LoginController,
  GetUserController
};