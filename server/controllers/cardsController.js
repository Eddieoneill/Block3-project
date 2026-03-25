const db = require("../db/db");
const shaffleDeck = require("../support/shaffleDeck");

const createLog = (log) => {
  return db("game_logs").insert(log).returning(["seed"]);
};

const getAll = async (req, res) => {
  try {
    const result = await db("cards").select("*");
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: `server error` }, err);
  }
};

const postNewGame = async (req, res) => {
  try {
    const { game, id } = req.body;
    const seed = shaffleDeck();
    const newLog = await createLog({
      game,
      seed,
      user_id: id,
    });

    // console.log(newLog);

    res.status(201).json(newLog);
  } catch (err) {
    res.status(500).send({ message: "post failed" }, err);
  }
};

module.exports = { getAll, postNewGame };
