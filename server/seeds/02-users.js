const bcrypt = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const createUser = async (username, password, role = "user", credit) => {
  const hashWord = await bcrypt.hash(password, 10);
  let temp = [
    {
      username: username,
      password: hashWord,
      role: role,
      credit: credit,
    },
  ];
  return temp;
};

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("table_name").del();
  await knex("table_name").insert([
    createUser("Admin", "Admin1234", "admin", 10000000),
  ]);
};
