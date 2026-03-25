// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || "localhost",
      port: 5432,
      user: "postgres",
      password: "docker",
      database: "casino_db",
    },
  },
};
