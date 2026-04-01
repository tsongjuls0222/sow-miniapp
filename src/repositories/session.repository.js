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

module.exports = {
  createSession
};