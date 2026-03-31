import { useState, useEffect, useContext, useRef } from "react";
import AppContext from "../context/AppContext";
import post from "../support/post";
import Card from "./Card";
import "../css/Blackjack.css";
import { useNavigate } from "react-router-dom";
import playCardFlipSound from "../support/cardFlipSound";
import DisplayResult from "./DisplayResult";

export default function BlackJack({ setSlowLoading }) {
  const { user, setUser, cards } = useContext(AppContext);
  const [jsonSeed, setJsonSeed] = useState(null);
  const [seed, setSeed] = useState(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [playerCard1, setPlayerCard1] = useState(null);
  const [playerCard2, setPlayerCard2] = useState(null);
  const [botCard1, setBotCard1] = useState(null);
  const [rotateBot, setRotateBot] = useState(false);
  const botCardsRef = useRef(null);
  const playerCardsRef = useRef(null);
  const [botCards, setBotCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [botResult, setBotResult] = useState("");
  const [gameResult, setGameResult] = useState("");
  const [isRemoved, setIsRemoved] = useState(true);
  const [betAmount, setBetAmount] = useState(0);

  const [addedBotCards, setAddedBotCards] = useState([]);
  const [addedPlayerCards, setAddedPlayerCards] = useState([]);
  const [cardRefs, setCardRefs] = useState([]);
  const [cardIndex, setCardIndex] = useState(4);
  const [playerSumCards, setPlayerSumCards] = useState(null);
  const [playerSum, setPlayerSum] = useState(0);
  const [botSumCards, setBotSumCards] = useState(null);
  const [botSum, setBotSum] = useState(0);
  const botSumRef = useRef(0);
  const [cardsRevealed, setCardsRevealed] = useState(false);
  const [gameResult2, setGameResult2] = useState("");
  const [playerResultRevealed, setPlayerResultRevealed] = useState(false);
  const [botResultRevealed, setBotResultRevealed] = useState(false);

  const startNewGame = () => {
    setBotResultRevealed(false);
    setPlayerResultRevealed(false);
    setGameResult2("");
    setAddedBotCards([]);
    setAddedPlayerCards([]);
    setCardRefs([]);
    setCardIndex(4);
    setPlayerSumCards(null);
    setPlayerSum(0);
    setBotSumCards(null);
    setBotSum(0);
    botSumRef.current = 0;
    setCardsRevealed(false);
    for (let i = 1; i < 3; i++) {
      botCardsRef.current.childNodes[i].className = "card-sleeve2";
    }
    playerCard1.current.className = "card-sleeve2";
    playerCard2.current.className = "card-sleeve2";
    setGameRunning(false);
    setTimeout(() => flipPlayerCards(), 700);
  };

  const flipPlayerCards = () => {
    console.log(botCardsRef.current.childNodes);
    botCardsRef.current.childNodes[1].className = "card-sleeve2 flipped";
    playerCard1.current.className = "card-sleeve2 flipped";
    playerCard2.current.className = "card-sleeve2 flipped";
  };

  const subtractBet = () => {
    if (betAmount - 100 < 0) {
      setBetAmount(0);
    } else {
      setBetAmount(betAmount - 100);
    }
  };

  const addBet = () => {
    if (betAmount + 100 > user.credit) {
      setBetAmount(user.credit);
    } else {
      setBetAmount(betAmount + 100);
    }
  };

  const getNewCard = () => {
    const currCard = cards[seed[cardIndex]];
    setCardIndex(cardIndex + 1);
    return { currCard };
  };

  const getAllCards = () => {
    if (botSumRef.current >= 17) {
      if (botSum > playerSum) {
        setGameResult2("You Lose...");
      } else {
        setGameResult2("You Win!");
      }
      return;
    }
    const currCard = cards[seed[cardIndex]];
    setCardIndex(cardIndex + 1);
    const cardElement = (
      <Card card={currCard} rotate={true} cardName={"card2 rotate"} />
    );
    setBotSumCards([...botSumCards, currCard.value]);
    setAddedBotCards([...addedBotCards, cardElement]);
    setTimeout(() => getAllCards(), 1000);
  };

  const revealAll = () => {
    setCardsRevealed(true);
    setBotSumCards([...botSumCards]);
    botCardsRef.current.childNodes[2].className = "card-sleeve2 flipped";
    setTimeout(() => getAllCards(), 1000);
  };

  const hitButtonPressed = () => {
    if (playerSum >= 21) return;
    const newCard = getNewCard();
    const { currCard } = newCard;
    const cardElement = <Card card={currCard} rotate={true} />;
    setPlayerSumCards([...playerSumCards, currCard.value]);
    setAddedPlayerCards([...addedPlayerCards, cardElement]);
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
    setPlayerCards([cards[seed[2]], cards[seed[3]]]);
    setPlayerSumCards([cards[seed[2]].value, cards[seed[3]].value]);
    setBotSumCards([cards[seed[0]].value, cards[seed[1]].value]);
  }, [seed]);

  useEffect(() => {
    if (!playerCard2 || !playerCard1 || !botCard1) return;
    setCardRefs([botCard1, playerCard1, playerCard2]);
  }, [playerCard2]);

  useEffect(() => {
    if (cardRefs.length === 0) return;
    cardRefs.forEach((ref) => {
      ref.current.className = "card-sleeve2 flipped";
    });
  }, [cardRefs]);

  useEffect(() => {
    if (addedPlayerCards.length === 0) return;

    for (let i = 0; i < addedPlayerCards.length; i++) {
      playerCardsRef.current.childNodes[i + 3].className =
        "card-sleeve2 flipped";
    }
  }, [addedPlayerCards]);

  useEffect(() => {
    if (!playerSumCards) return;
    setPlayerSum(getSum(playerSumCards));
  }, [playerSumCards]);

  useEffect(() => {
    if ((playerSum >= 21 || cardsRevealed) && !playerResultRevealed) {
      if (playerSum < 21) {
        setAddedPlayerCards([
          ...addedPlayerCards,
          <h2 className="game-result2">You got: {playerSum}</h2>,
        ]);
      } else if (playerSum === 21) {
        setAddedPlayerCards([
          ...addedPlayerCards,
          <h2 className="game-result2">You got: BlackJack</h2>,
        ]);
      } else {
        setAddedPlayerCards([
          ...addedPlayerCards,
          <h2 className="game-result2">You Busted with: {playerSum}...</h2>,
        ]);
      }
      setPlayerResultRevealed(true);
    }
  }, [playerSum, cardsRevealed]);

  useEffect(() => {
    if (addedBotCards.length === 0) return;

    for (let i = 0; i < addedBotCards.length; i++) {
      botCardsRef.current.childNodes[i + 3].className = "card-sleeve2 flipped";
    }
  }, [addedBotCards]);

  useEffect(() => {
    if (!botSumCards) return;
    console.log(getSum(botSumCards));
    setBotSum(getSum(botSumCards));
  }, [botSumCards]);

  useEffect(() => {
    botResultRevealed;
    if (botSum >= 17 && cardsRevealed && !botResultRevealed) {
      if (botSum < 21) {
        setAddedBotCards([
          ...addedBotCards,
          <h2 className="game-result2">Bot got: {botSum}</h2>,
        ]);
      } else if (botSum === 21) {
        setAddedBotCards([
          ...addedBotCards,
          <h2 className="game-result2">Bot got: BlackJack</h2>,
        ]);
      } else {
        setAddedBotCards([
          ...addedBotCards,
          <h2 className="game-result2">Bot Busted with: {botSum}!</h2>,
        ]);
      }
      setBotResultRevealed(true);
    }
    botSumRef.current = botSum;
  }, [botSum, cardsRevealed]);

  if (!seed) return;

  return (
    <div className="container2">
      <div className="poker-container2">
        <div ref={botCardsRef} className="player-container2">
          <br />
          <Card
            setPlayerCard={setBotCard1}
            card={botCards[0]}
            rotate={rotateBot}
            cardName={"card2 rotate"}
          />
          <Card
            card={botCards[1]}
            rotate={rotateBot}
            cardName={"card2 rotate"}
          />
          {addedBotCards.map((card) => card)}
          <h2>{botResult[0]}</h2>
        </div>
        <h2 className="game-result">{gameResult2}</h2>
        <div className="player-container2" ref={playerCardsRef}>
          <div className="bet-container2">
            <h3>$: {betAmount}</h3>
            <div className="bet-button-container2">
              <button className="bet-button2" onClick={subtractBet}>
                -
              </button>
              <button className="bet-button2" onClick={addBet}>
                +
              </button>
            </div>
            <div className="bet-button-container2">
              <button className="game-button2" onClick={hitButtonPressed}>
                Hit
              </button>
              <button className="game-button2" onClick={revealAll}>
                Stay
              </button>
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
          {addedPlayerCards.map((card) => card)}
        </div>
      </div>
      <button id="newgame-button2" onClick={startNewGame}>
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

const getSeed = async (setJsonSeed, setGameRunning, user) => {
  setJsonSeed(
    await post("http://localhost:8000/cards/shaffle", {
      id: user.id,
      game: "black-jack",
    }),
  );
  setGameRunning(true);
};

const unwrapSeed = (jsonSeed, setSeed) => {
  const indexList = [];
  jsonSeed[0].seed.split(",").forEach((i) => indexList.push(Number(i)));
  setSeed(indexList);
};

const getSum = (cards) => {
  let hasAce = false;
  let sum = 0;
  let withAceSum = 0;

  cards.forEach((card) => {
    if (card === "ACE" && hasAce === false) {
      hasAce = true;
      withAceSum += 11;
      sum += 1;
    } else if (card === "ACE") {
      withAceSum += 1;
      sum += 1;
    } else if (card.length > 1 || card === "0") {
      sum += 10;
      withAceSum += 10;
    } else {
      sum += Number(card);
      withAceSum += Number(card);
    }
  });

  if (hasAce === true && withAceSum <= 21) {
    return withAceSum;
  }

  return sum;
};
