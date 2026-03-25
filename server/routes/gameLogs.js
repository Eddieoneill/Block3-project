const express = require("express");
const { getAll } = require("../controllers/gameLogController");

const router = express();

router.get("/", getAll);
// router.get("/:id", getAllById);

module.exports = router;
