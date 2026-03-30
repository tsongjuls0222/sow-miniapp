const { findUserByIdToken } = require("../repositories/auth.repository");

function authGuard(required = true) {
  return async (req, reply) => {
    try {
        const header = req.headers.authorization || "";
        const token = header.startsWith("Bearer ") ? header.slice(7) : null;

        if (!token) {
            if (!required) return;
            return reply.status(401).send({
                status: 0,
                error: "Missing Bearer token",
            });
        }

        const decoded = await req.jwtVerify();
        if(!decoded || !decoded.id || !decoded.email) {
            return reply.status(401).send({
                status: 0,
                error: "Invalid token payload",
            });
        }

        const user = await findUserByIdToken(req.server, decoded.id, token);
        if (!user) {
            return reply.status(401).send({
                status: 0,
                error: "user not found",
            });
        }

        req.currentUser = user;

    } catch (error) {
      req.log.error({ error }, "authGuard failed");

      return reply.status(401).send({
        status: 0,
        error: "Invalid or expired token",
      });
    }
  };
}

module.exports = {
  authGuard
};