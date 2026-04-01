const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { findUser, updateSession, findLanguage, findUserById } = require("../repositories/auth.repository");
const { createSession, findActiveSession, deactivateSession } = require("../repositories/session.repository");

async function AuthService(req) {
  try {
    const _body = req.body;

    const find_user = await findUser(req.server, _body.email);
    if (!find_user) {
      return {
        code: 0,
        message: "User not found."
      };
    }

    const isMatch = await bcrypt.compare(_body.password, find_user.password);
    if (!isMatch) {
      return {
        code: 0,
        message: "Invalid credentials."
      };
    }

    const sessionId = crypto.randomUUID();

    const accessToken = req.server.generateAccessToken(
      {
        id: find_user.id,
        email: find_user.email
      },
      sessionId
    );

    const refreshToken = req.server.generateRefreshToken(
      {
        id: find_user.id,
        email: find_user.email
      },
      sessionId
    );

    const create_session = await createSession(req.server, {
      user_id: find_user.id,
      session_id: sessionId,
      refresh_token: refreshToken
    });

    if (!create_session) {
      return {
        code: 0,
        message: "Session creation failed."
      };
    }

    return {
      code: 1,
      data: {
        refreshToken,
        accessToken,
        find_user
      }
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? `${error.message} AuthService Unknown error`
        : "AuthService Unknown error";

    return {
      code: 0,
      message
    };
  }
}

async function RefreshService(req) {
  try {
    const rToken = req.cookies.refreshToken;

    if (!rToken) {
      return {
        code: 0,
        message: "Refresh token not found"
      };
    }

    const decodedRefreshToken = await req.server.verifyRefreshToken(rToken);
    if (!decodedRefreshToken) {
      return {
        code: 0,
        message: "Invalid refresh token."
      };
    }

    const find_session = await findActiveSession(req.server, {
      user_id: decodedRefreshToken.userId,
      session_id: decodedRefreshToken.sessionId
    });

    if (!find_session) {
      return {
        code: 0,
        message: "Session not found or inactive."
      };
    }

    if (find_session.refresh_token !== rToken) {
      return {
        code: 0,
        message: "Refresh token mismatch."
      };
    }

    const find_user = await findUserById(req.server, { id:decodedRefreshToken.userId });
    if (!find_user) {
      return {
        code: 0,
        message: "User not found."
      };
    }
    

    const newAccessToken = req.server.generateAccessToken(
      {
        id: find_user.id,
        email: find_user.email
      },
      decodedRefreshToken.sessionId
    );

    return {
      code: 1,
      data: {
        accessToken: newAccessToken
      },
      message: "Token refreshed successfully"
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? `${error.message} RefreshService Unknown error`
        : "RefreshService Unknown error";

    return {
      code: 0,
      message
    };
  }
}

async function GetUserService(req) {
  try {
    if(!req.currentUser) {
      return {
        code: 0,
        message: "No authenticated user found."
      };
    }

    const find_user = await findUserById(req.server, { id: req.currentUser.userId });
    if (!find_user) {
      return {
        code: 0,
        message: "User not found."
      };
    } 

    return {
      code: 1,
      data: {
        user :  find_user
      },
      message: "User retrieved successfully."
    };

  } catch (error) {
    const message =
      error instanceof Error
        ? `${error.message} "GetUserService Unknown error"`
        : "GetUserService Unknown error";

    return {
      code: 0,
      message
    };
  }
}

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

async function LogoutService(req) {
  try {
    const rToken = req.cookies.refreshToken;

    if (!rToken) {
      return {
        code: 1,
        data: null,
        message: "Already logged out"
      };
    }

    const decodedRefreshToken = await req.server.verifyRefreshToken(rToken);

    if (!decodedRefreshToken) {
      return {
        code: 0,
        message: "Invalid refresh token."
      };
    }

    const deactivated = await deactivateSession(req.server, {
      user_id: decodedRefreshToken.userId,
      session_id: decodedRefreshToken.sessionId
    });

    if (!deactivated) {
      return {
        code: 0,
        message: "Session not found or already inactive."
      };
    }

    return {
      code: 1,
      data: null,
      message: "Logout successful"
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? `${error.message} LogoutService Unknown error`
        : "LogoutService Unknown error";

    return {
      code: 0,
      message
    };
  }
}

module.exports = { 
  AuthService,
  GetUserService,
  GetLanguageService,
  LogoutService,
  RefreshService
};