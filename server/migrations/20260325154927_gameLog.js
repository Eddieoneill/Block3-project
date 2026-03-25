/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("game_logs", (table) => {
    table.increments();
    table.string("game");
    table.string("seed");
    table.string("created_at").defaultTo(knex.fn.now());
    table.integer("user_id").unsigned();

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("game_logs");
};
