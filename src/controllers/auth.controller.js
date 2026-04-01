const { AuthService, GetUserService, GetLanguageService, LogoutService, RefreshService } = require("../services/auth.service");

async function LoginController(req, response) {
  try {
    const auth_service = await AuthService(req);
    if(!auth_service || auth_service.code !== 1) {
      return response.code(400).send({
        code: 0,
        message: auth_service?.message ?? "Login Failed"
      });
    }


    response.setCookie("refreshToken", auth_service.data.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/"
    });
    return response.code(200).send({
      code: 1,
      data: {
        token : auth_service.data.accessToken
      },
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

async function RefreshController(req, response) {
  try {
    const refresh_service = await RefreshService(req);
    if(!refresh_service || refresh_service.code !== 1) {
      return response.code(400).send({
        code: 0,
        message: refresh_service?.message ?? "Login Failed"
      });
    }

    return response.code(200).send({
      code: 1,
      data: {
        accessToken : refresh_service.data.accessToken
      },
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

async function LogoutController(req, reply) {
  try {
    const logout_service = await LogoutService(req);

    reply.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/"
    });

    if (!logout_service || logout_service.code !== 1) {
      return reply.code(400).send({
        code: 0,
        message: logout_service?.message ?? "Logout Failed"
      });
    }

    return reply.code(200).send({
      code: 1,
      data: logout_service.data ?? null,
      message: "Logout Success"
    });
  } catch (error) {
    reply.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/"
    });

    const message =
      error instanceof Error
        ? error.message
        : "LogoutController Unknown error";

    return reply.code(500).send({
      code: 0,
      message
    });
  }
}

module.exports = {
  LoginController,
  GetUserController,
  GetLanguageController,
  LogoutController,
  RefreshController
};