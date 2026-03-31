import { useState, useEffect, useContext, useRef } from "react";
import "../css/Card.css";
import playCardFlipSound from "../support/cardFlipSound";
import AppContext from "../context/AppContext";
import post from "../support/post";
import { useNavigate } from "react-router-dom";

function Card({ setPlayerCard, card, rotate, cardName = "card2" }) {
  const backCardImage = "/BackCardImage.png";
  const eRef = useRef(null);
  const [elementRef, setElementRef] = useState(null);

  useEffect(() => {
    if (!eRef) return;
    setElementRef(eRef);
    if (setPlayerCard) {
      setPlayerCard(eRef);
    }
  }, [eRef]);

  useEffect(() => {}, [rotate]);

  const cardClicked = () => {
    if (!rotate) return;
    playCardFlipSound();
    if (elementRef.current.className === "card-sleeve2 flipped") {
      elementRef.current.className = "card-sleeve2";
    } else {
      elementRef.current.className = "card-sleeve2 flipped";
    }
  };

  if (!card) return;
  return (
    <div ref={eRef} className="card-sleeve2" onClick={cardClicked}>
      <div className="card-sleeve-inner2">
        <div className="front2">
          <img className={cardName} src={backCardImage} alt="backCard" />
        </div>
        <div className="back2">
          <img className={cardName} src={card.image} alt="frontCard" />
        </div>
      </div>
    </div>
  );
}

export default Card;
