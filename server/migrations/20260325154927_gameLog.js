/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("game_logs", (table) => {
    table.increments();
    table.string("name").notNullable().unique();
    table.string("game_name");
    table.integer("user_id").unsigned();
    table.integer("deck_id").unsigned();

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
    table
      .foreign("deck_id")
      .references("id")
      .inTable("cards")
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
