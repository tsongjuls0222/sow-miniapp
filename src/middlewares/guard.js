const { findUserByIdToken } = require("../repositories/auth.repository");

function authGuard(required = true) {
  return async (req, reply) => {
    try {
        const header = req.headers.authorization || "";
        const token = header.startsWith("Bearer ") ? header.slice(7) : null;

        if (!token) {
            if (!required) return;
            return reply.status(401).send({
                code: 0,
                message: "Missing Bearer token",
            });
        }

        const decoded = await req.server.verifyAccessToken(token);
        console.log("Decoded token:", decoded);
        if(!decoded || !decoded.userId || !decoded.email || !decoded.sessionId) {
            return reply.status(401).send({
                code: 0,
                message: "Invalid token payload",
            });
        }

        req.currentUser = decoded;

    } catch (error) {
      req.log.error({ error }, "authGuard failed");

      return reply.status(401).send({
        code: 0,
        message: "Invalid or expired token",
      });
    }
  };
}

module.exports = {
  authGuard
};