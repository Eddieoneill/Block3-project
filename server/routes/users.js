const express = require("express");
const { getAll, getAllById } = require("../controllers/usersController");

const router = express();

router.get("/", getAll);
router.get("/:id", getAllById);

module.exports = router;
