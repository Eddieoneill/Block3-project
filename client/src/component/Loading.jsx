import { useState, useRef, useEffect } from "react";
import "../css/App.css";
import "../css/Loading.css";

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function Loading() {
  const [backCardImage, setBackCardImage] = useState(null);
  const [cards, setCards] = useState(null);
  const elementRef = useRef(null);
  const imageElement = useRef(null);

  useEffect(() => {
    fetch("http://localhost:8000/cards")
      .then((data) => data.json())
      .then((cards) => {
        let tempArr = [];
        cards.forEach((card, i) => {
          if (i !== 0) {
            tempArr.push(card.image);
          }
        });
        setCards(shuffleArray(tempArr));
      });
    fetch("http://localhost:8000/back")
      .then((data) => data.json())
      .then((back) => {
        setBackCardImage(back.image);
      });
  }, []);

  useEffect(() => {
    if (elementRef && cards) {
      animateFlip(0);
    }
  }, [cards]);

  const animateFlip = (i) => {
    if (cards.length <= i) {
      setCards(shuffleArray(cards));
      animateFlip(0);
      return;
    }

    if (elementRef.current.className === "card-sleeve flipped") {
      elementRef.current.className = "card-sleeve";
      setTimeout(() => animateFlip(i + 1), 1500);
    } else {
      elementRef.current.className = "card-sleeve flipped";
      imageElement.current.src = cards[i];
      setTimeout(() => animateFlip(i + 1), 1500);
    }
  };

  if (!backCardImage && !cards) return <div>Loading...</div>;

  return (
    <>
      <div ref={elementRef} className="card-sleeve">
        <div className="card-sleeve-inner">
          <div className="front">
            <img id="1" className="card" src={backCardImage} alt="backCard" />
          </div>
          <div className="back">
            <img
              ref={imageElement}
              id="2"
              className="card"
              src={backCardImage}
              alt="backCard"
            />
          </div>
        </div>
      </div>
      <h1>Loading...</h1>
    </>
  );
}

export default Loading;
