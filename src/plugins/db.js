const fp = require("fastify-plugin");
const { Pool } = require("pg");

async function dbPlugin(app) {
  const pool = new Pool({
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT || 5432),
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    max: process.env.PG_POOL_MAX
      ? Number(process.env.PG_POOL_MAX)
      : 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 15000
  });

  try {
    const client = await pool.connect();
    client.release();
    app.log.info("PostgreSQL connected");
  } catch (err) {
    app.log.error({ err }, "PostgreSQL connection failed");
    throw err;
  }

  app.decorate("db", pool);

  app.addHook("onClose", async () => {
    await pool.end();
  });
}

module.exports = fp(dbPlugin, {
  name: "postgres-db-plugin"
});