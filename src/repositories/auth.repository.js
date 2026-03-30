async function findUser(app, email) {
  try {
    const query = `select id, email, first_name, last_name, status, created_at, updated_at, password FROM app.t_users where email = $1 LIMIT 1`;

    const { rows } = await app.db.query(query, [email]);
    return rows[0] ?? null;
  } catch (error) {
    console.log(error)
    app.log.error({ error }, "findUser failed");
    return null;
  }
}

async function findUserById(app, data) {
  try {
    const query = `select id, email, first_name, last_name, status, created_at, updated_at FROM app.t_users where id = $1 LIMIT 1`;

    const { rows } = await app.db.query(query, [data.id]);
    return rows[0] ?? null;
  } catch (error) {
    console.log(error)
    app.log.error({ error }, "findUserById failed");
    return null;
  }
}

async function findUserByIdToken(app, id, token) {
  try {
    const query = `select id, email, first_name, last_name, status, created_at, updated_at FROM app.t_users where id = $1 AND session = $2 LIMIT 1`;

    const { rows } = await app.db.query(query, [id, token]);
    return rows[0] ?? null;
  } catch (error) {
    console.log(error)
    app.log.error({ error }, "findUserByIdToken failed");
    return null;
  }
}

async function updateSession(app, token, id) {
  try {
    const query = `UPDATE app.t_users SET session = $1, updated_at = NOW() WHERE id = $2`;
    console.log(query)
    const result = await app.db.query(query, [token, id]);
    if (result.rowCount === 0) {
      return {
        code: 0,
        message: "Update failed (user not found or no change)"
      };
    }

    return {
      code: 1,
      message: "Session updated successfully"
    };

  } catch (error) {
    console.log(error);
    app.log.error({ error }, "updateSession failed");

    return {
      code: 0,
      message: "Database error"
    };
  }
}

module.exports = {
  findUser,
  findUserById,
  updateSession,
  findUserByIdToken
};