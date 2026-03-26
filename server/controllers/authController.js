const db = require("../db/db");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const createUser = async (user) => {};

const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
  } catch (err) {}
};
