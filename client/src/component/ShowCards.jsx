import { useState, useEffect, useContext, useRef } from "react";
import AppContext from "../context/AppContext";
import Card from "./Card";
import "../css/ShowCards.css";
import { useNavigate } from "react-router-dom";
import "../css/HomePage.css";

function HomePage() {
  const { cards } = useContext(AppContext);
  const cardsRef = useRef(null);

  const flipCard = (i, cards) => {
    if (i === 52) return;

    cards[i].className = "card-sleeve2 flipped";

    setTimeout(() => flipCard(i + 1, cards), 100);
  };

  useEffect(() => {
    if (cardsRef) {
      flipCard(0, cardsRef.current.childNodes);
    }
  }, [cardsRef]);

  return (
    <div>
      <div ref={cardsRef} className="card-container">
        {cards.map((card) => (
          <Card card={card} rotate={true} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
