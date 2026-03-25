const express = require("express");
const { getAll } = require("../controllers/cardsController");

const router = express();

router.get("/", getAll);
// router.get("/:id", getAllById);

module.exports = router;
