const db = require("../db/db");

const getAll = async (req, res) => {
  try {
    const result = await db("users").select("*");
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: `server error` }, err);
  }
};

const getAllById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db("users").select("*").where("id", id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ message: "server error" });
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { credit } = req.body;

  try {
    if (credit === undefined || credit === null) {
      return res.status(400).send({ message: "bad data" });
    }
    const result = await db("users")
      .select("*")
      .where("id", id)
      .update({ credit });
    res.status(200).json(credit);
  } catch (err) {
    res.status(500).send({ message: "server error" });
  }
};

module.exports = { getAll, getAllById, updateById };
