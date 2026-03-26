const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const port = 8000;

const userRoutes = require("./routes/users");
const cardsRoutes = require("./routes/cards");
const gameLogsRoutes = require("./routes/gameLogs");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/users", userRoutes);
app.use("/cards", cardsRoutes);
app.use("/gameLogs", gameLogsRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).send({ message: "The API is up and running!" });
});

app.get("/back", (req, res) => {
  res
    .status(200)
    .send({ image: "https://deckofcardsapi.com/static/img/back.png" });
});

app.listen(port, () => {
  console.log(`Your server is running on port: localhost:${port}`);
});
