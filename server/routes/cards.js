const express = require("express");
const { getAll, postNewGame } = require("../controllers/cardsController");

const router = express();

router.get("/", getAll);
router.post("/shaffle", postNewGame);

module.exports = router;
