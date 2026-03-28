import { useState, useEffect, useContext } from "react";
import AppContext from "../context/AppContext";
import post from "../support/post";
import Card from "./Card";
import "../css/Poker.css";
import { useNavigate } from "react-router-dom";

function Poker() {
  const { user, cards } = useContext(AppContext);
  const [jsonSeed, setJsonSeed] = useState(null);
  const [seed, setSeed] = useState(null);
  const [gameRunning, setGameRunning] = useState(false);

  useEffect(() => {
    if (!gameRunning) {
      getSeet(setJsonSeed, setGameRunning, user);
    }
  }, [gameRunning]);

  useEffect(() => {
    if (!jsonSeed) return;
    unwrapSeed(jsonSeed, setSeed);
  }, [jsonSeed]);

  if (!seed) return;
  console.log(cards);
  return (
    <div className="container">
      <div className="poker-container">
        <div className="player-container">
          <Card card={cards[seed[0]]} isRotated={true} />
          <Card card={cards[seed[1]]} isRotated={true} />
        </div>
        <div className="center-container">
          <Card card={cards[seed[2]]} />
          <Card card={cards[seed[3]]} />
          <Card card={cards[seed[4]]} />
          <Card card={cards[seed[5]]} />
          <Card card={cards[seed[6]]} />
        </div>
        <div className="player-container">
          <Card card={cards[seed[7]]} />
          <Card card={cards[seed[8]]} />
        </div>
      </div>
    </div>
  );
}

const getSeet = async (setJsonSeed, setGameRunning, user) => {
  setJsonSeed(
    await post("http://localhost:8000/cards/shaffle", {
      id: user.id,
      game: "poker",
    }),
  );
  setGameRunning(true);
};

const unwrapSeed = (jsonSeed, setSeed) => {
  const indexList = [];
  jsonSeed[0].seed.split(",").forEach((i) => indexList.push(Number(i)));
  setSeed(indexList);
};

export default Poker;
