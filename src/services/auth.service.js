const bcrypt = require("bcrypt");
const { findUser, updateSession, findLanguage } = require("../repositories/auth.repository");

async function AuthService(req) {
  try {
    const _body = req.body;
    const salt_rounds = Number(process.env.SALT_ROUNDS);
    const hashed_password = await bcrypt.hash(_body.password, salt_rounds);
    if(!hashed_password) {
      return {
        code: 0,
        message: "Password hashing failed"
      };
    }

    const find_user = await findUser(req.server, _body.email, hashed_password);
    if(!find_user) {
      return {
        code: 0,
        message: "User not found."
      };
    }

    const isMatch = await bcrypt.compare(_body.password, find_user.password);
    if(!isMatch) {
      return {
        code: 0,
        message: "Invalid credentials."
      };
    }

    const token = req.server.generateToken({id: find_user.id, email: find_user.email, status: find_user.status});
    if(!token) {
      return {
        code: 0,
        message: "Token generation failed."
      };
    }

    const update_session = await updateSession(req.server, token, find_user.id);
    if(update_session.code !== 1) {
      return {
        code: 0,
        message: update_session.message || "Session update failed."
      };
    }

    return {
      code: 1,
      data: { token }
    };

  } catch (error) {
    const message =
      error instanceof Error
        ? `${error.message} "AuthService Unknown error"`
        : "AuthService Unknown error";

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

    return {
      code: 1,
      data: req.currentUser,
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

module.exports = { 
  AuthService,
  GetUserService,
  GetLanguageService
};