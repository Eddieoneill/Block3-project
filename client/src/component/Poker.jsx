import { useState, useEffect, useContext, useRef } from "react";
import AppContext from "../context/AppContext";
import post from "../support/post";
import Card from "./Card";
import "../css/Poker.css";
import CardComboLogic from "../support/CardComboLogic";
import playCardFlipSound from "../support/cardFlipSound";
import DisplayResult from "./DisplayResult";
import { useNavigate } from "react-router-dom";

function Poker({ setSlowLoading }) {
  const { user, cards } = useContext(AppContext);
  const [jsonSeed, setJsonSeed] = useState(null);
  const [seed, setSeed] = useState(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [playerCard1, setPlayerCard1] = useState(null);
  const [playerCard2, setPlayerCard2] = useState(null);
  const [rotateBot, setRotateBot] = useState(false);
  const [rotateCenter, setRotateCenter] = useState(false);
  const centerCardsRef = useRef(null);
  const botCardsRef = useRef(null);
  const [botCards, setBotCards] = useState([]);
  const [centerCards, setCenterCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [playerResult, setPlayerResult] = useState("");
  const [botResult, setBotResult] = useState("");
  const [gameResult, setGameResult] = useState("");
  const [isRemoved, setIsRemoved] = useState(true);

  const revealCenter = (i) => {
    if (rotateBot || rotateCenter) return;
    if (i === 6) {
      setRotateCenter(true);
      setTimeout(() => revealBot(1), 200);
      return;
    }
    if (i < 5) playCardFlipSound();
    centerCardsRef.current.childNodes[i].className = "card-sleeve2 flipped";
    setTimeout(() => revealCenter(i + 1), 500);
  };
  const revealBot = (i) => {
    if (i === 3) {
      setRotateBot(true);
      const result = revealGameResult(botCards, playerCards, centerCards);
      setBotResult(result.botResult);
      setPlayerResult(result.playerResult);

      const gameResult = compareResult(
        result.botResult[1].split(","),
        result.playerResult[1].split(","),
        result.botResult[2],
        result.playerResult[2],
        user.username,
      );

      setGameResult(gameResult);
      setIsRemoved(false);
      return;
    }
    playCardFlipSound();
    botCardsRef.current.childNodes[i].className = "card-sleeve2 flipped";
    setTimeout(() => revealBot(i + 1), 500);
  };

  const startNewGame = () => {
    // setSlowLoading(false);
    setGameRunning(false);
    setRotateCenter(false);
    setRotateBot(false);
    setBotResult("");
    setPlayerResult("");
    setGameResult("");
    for (let i = 0; i < 5; i++) {
      centerCardsRef.current.childNodes[i].className = "card-sleeve2";
    }
    for (let i = 1; i < 3; i++) {
      botCardsRef.current.childNodes[i].className = "card-sleeve2";
    }
    playerCard1.current.className = "card-sleeve2";
    playerCard2.current.className = "card-sleeve2";
    setTimeout(() => flipPlayerCards(), 700);
  };

  const flipPlayerCards = () => {
    playerCard1.current.className = "card-sleeve2 flipped";
    playerCard2.current.className = "card-sleeve2 flipped";
  };

  useEffect(() => {
    if (!gameRunning) {
      getSeed(setJsonSeed, setGameRunning, user);
    }
  }, [gameRunning]);

  useEffect(() => {
    if (!jsonSeed) return;
    unwrapSeed(jsonSeed, setSeed);
  }, [jsonSeed]);

  useEffect(() => {
    if (!seed) return;
    setBotCards([cards[seed[0]], cards[seed[1]]]);
    setCenterCards([
      cards[seed[2]],
      cards[seed[3]],
      cards[seed[4]],
      cards[seed[5]],
      cards[seed[6]],
    ]);
    setPlayerCards([cards[seed[7]], cards[seed[8]]]);
  }, [seed]);

  useEffect(() => {
    if (!playerCard2) return;

    playerCard1.current.className = "card-sleeve2 flipped";
    playerCard2.current.className = "card-sleeve2 flipped";
  }, [playerCard2]);

  if (!seed) return;

  return (
    <div className="container">
      <div className="poker-container">
        <div ref={botCardsRef} className="player-container">
          <br />
          <Card
            card={botCards[0]}
            rotate={rotateBot}
            cardName={"card2 rotate"}
          />
          <Card
            card={botCards[1]}
            rotate={rotateBot}
            cardName={"card2 rotate"}
          />
          <h2>{botResult[0]}</h2>
        </div>
        <div ref={centerCardsRef} className="center-container">
          <Card card={centerCards[0]} rotate={rotateCenter} />
          <Card card={centerCards[1]} rotate={rotateCenter} />
          <Card card={centerCards[2]} rotate={rotateCenter} />
          <Card card={centerCards[3]} rotate={rotateCenter} />
          <Card card={centerCards[4]} rotate={rotateCenter} />
          <button id="reveal-button" onClick={() => revealCenter(0)}>
            Reveal
          </button>
          <h2 id="game-result">{gameResult}</h2>
        </div>
        <div className="player-container">
          <div className="bet-container">
            <h3>$:000</h3>
            <button>ALL-IN</button>
            <div className="bet-button-container">
              <button className="bet-button">-</button>
              <button className="bet-button">+</button>
            </div>
          </div>
          <Card
            setPlayerCard={setPlayerCard1}
            card={playerCards[0]}
            rotate={true}
          />
          <Card
            setPlayerCard={setPlayerCard2}
            card={playerCards[1]}
            rotate={true}
          />
          <h2>{playerResult[0]}</h2>
        </div>
      </div>
      <button id="newgame-button" onClick={startNewGame}>
        New Game
      </button>
      <DisplayResult
        gameResult={gameResult}
        isRemoved={isRemoved}
        setIsRemoved={setIsRemoved}
      />
    </div>
  );
}

const revealGameResult = (botCards, playerCards, centerCards) => {
  const botResult = CardComboLogic.getBestCombo(botCards, centerCards, "Bot");
  const playerResult = CardComboLogic.getBestCombo(
    playerCards,
    centerCards,
    "You",
  );

  return { botResult, playerResult };
};

const compareResult = (
  botNums,
  playerNums,
  botType,
  playerType,
  playerName,
) => {
  if (playerType < botType) {
    return `${playerName} Won!`;
  } else if (botType < playerType) {
    return "You Lose...";
  } else {
    return getHighPair(botNums, playerNums);
  }
};

const getHighPair = (botNums, playerNums, name) => {
  const resultToNum = {
    ACE: 14,
    KING: 13,
    QUEEN: 12,
    JACK: 11,
    10: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
  };
  const sortedPlayerNums = playerNums.sort((a, b) => {
    return resultToNum[a] - resultToNum[b];
  });

  const sortedBotNums = botNums.sort((a, b) => {
    return resultToNum[a] - resultToNum[b];
  });

  if (resultToNum[sortedBotNums[0]] > resultToNum[sortedPlayerNums[0]]) {
    return "You Lose...";
  } else if (resultToNum[sortedBotNums[0]] < resultToNum[sortedPlayerNums[0]]) {
    return `${name} Won!`;
  } else {
    if (resultToNum[sortedBotNums[1]] > resultToNum[sortedPlayerNums[1]]) {
      return "You Lose...";
    } else if (
      resultToNum[sortedBotNums[1]] < resultToNum[sortedPlayerNums[1]]
    ) {
      return `${name} Won!`;
    } else {
      return "Draw";
    }
  }
};

const getSeed = async (setJsonSeed, setGameRunning, user) => {
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
