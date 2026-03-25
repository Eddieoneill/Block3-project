const shaffleDeck = require("../support/shaffleDeck");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("game_logs").del();
  await knex("game_logs").insert([
    { game: "poker", seed: shaffleDeck(), user_id: 1 },
  ]);
};
