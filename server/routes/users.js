const express = require("express");
const {
  getAll,
  getAllById,
  updateById,
} = require("../controllers/usersController");

const router = express();

router.get("/", getAll);
router.get("/:id", getAllById);
router.post("/:id", updateById);

module.exports = router;
