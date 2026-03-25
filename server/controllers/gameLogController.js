const db = require("../db/db");

const getAll = async (req, res) => {
  try {
    const result = await db("game_logs").select("*");
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: `server error` }, err);
  }
};

// const getAllById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await db("users").select("*").where("id", id);
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).send({ message: "server error" });
//   }
// };

module.exports = { getAll };
