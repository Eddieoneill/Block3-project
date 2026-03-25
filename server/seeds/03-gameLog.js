const shaffleDeck = require("../support/shaffleDeck");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  const [admin] = await knex("users").where({ username: "Admin" }).select("id");

  await knex("game_logs").del();
  await knex("game_logs").insert([
    { game: "poker", seed: shaffleDeck(), user_id: admin.id },
  ]);
};
