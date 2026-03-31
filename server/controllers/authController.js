const db = require("../db/db");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const createUser = async (user) => {
  return db("users")
    .insert(user)
    .returning(["id", "username", "role", "credit"]);
};

const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const exists = await db("users").where({ username }).first();

    if (exists) {
      return res.status(400).send({ message: "User already exists" });
    }

    const hashWord = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await createUser({
      username,
      password: hashWord,
      role: role || "user",
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await db("users").where({ username }).first();

    if (!user) {
      return res.status(400).send({ message: "User does not exists" });
    }
    const matches = await bcrypt.compare(password, user.password);

    if (!matches) {
      return res
        .status(400)
        .send({ message: "You have entered the wrong password..." });
    }

    res.cookie("user", {
      id: user.id,
      username: username,
      role: user.role,
    });

    res.status(200).json({
      user: {
        id: user.id,
        username: username,
        role: user.role,
        credit: user.credit,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie("user");
  res.json({ message: "Logged out" });
};

module.exports = { registerUser, login, logout };
