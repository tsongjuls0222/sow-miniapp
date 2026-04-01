async function createSession(app, data) {
  try {
    const query = `
      INSERT INTO app.t_user_sessions
      (
        user_id,
        session_id,
        refresh_token,
        is_active,
        expires_at,
        created_at
      )
      VALUES ($1, $2, $3, 1, NOW() + INTERVAL '7 days', NOW())
      RETURNING id, user_id, session_id, is_active, expires_at, created_at
    `;

    const { rows } = await app.db.query(query, [
      data.user_id,
      data.session_id,
      data.refresh_token
    ]);

    return rows[0] ?? null;
  } catch (error) {
    console.log(error);
    app.log.error({ error }, "createSession failed");
    return null;
  }
}

async function findActiveSession(app, data) {
  try {
    console.log(data)
    const query = `
      SELECT id, user_id, session_id, refresh_token, is_active, expires_at
      FROM app.t_user_sessions
      WHERE user_id = $1
        AND session_id = $2
        AND is_active = 1
      LIMIT 1
    `;

    const { rows } = await app.db.query(query, [
      data.user_id,
      data.session_id
    ]);

    return rows[0] ?? null;
  } catch (error) {
    console.log(error);
    app.log.error({ error }, "findActiveSession failed");
    return null;
  }
}

async function deactivateSession(app, data) {
  try {
    const query = `
      UPDATE app.t_user_sessions
      SET is_active = 0,
          updated_at = NOW()
      WHERE user_id = $1
        AND session_id = $2
        AND is_active = 1
    `;

    const result = await app.db.query(query, [
      data.user_id,
      data.session_id
    ]);

    return result.rowCount > 0;
  } catch (error) {
    console.log(error);
    app.log.error({ error }, "deactivateSession failed");
    return null;
  }
}

module.exports = {
  createSession,
  findActiveSession,
  deactivateSession
};