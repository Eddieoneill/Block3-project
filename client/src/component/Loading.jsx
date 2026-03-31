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

function Loading({ cards, setCards, slowLoading }) {
  // const [backCardImage, setBackCardImage] = useState(null);
  const backCardImage = "/BackCardImage.png";
  const eRef = useRef(null);
  const imageElement = useRef(null);
  const [elementRef, setElementRef] = useState(null);
  const [randomCards, setRandomCards] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/cards")
      .then((data) => data.json())
      .then((cards) => {
        let tempArr = [];
        cards.forEach((card) => {
          tempArr.push(card);
        });
        setCards(tempArr);
        setRandomCards(shuffleArray(tempArr));
      });
    // fetch("http://localhost:8000/back")
    //   .then((data) => data.json())
    //   .then((back) => {
    //     setBackCardImage(back.image);
    //   });
  }, []);

  useEffect(() => {
    setElementRef(eRef);
  }, [eRef]);

  useEffect(() => {
    if (elementRef && cards && !slowLoading) {
      animateFlip(0);
    }
  }, [slowLoading, cards]);

  const animateFlip = (i) => {
    if (slowLoading) {
      elementRef.current.className = "card-sleeve";
      return;
    }
    if (cards.length <= i) {
      setRandomCards(shuffleArray(cards));
      animateFlip(0);
      return;
    }

    if (!elementRef.current) return;
    if (elementRef.current.className === "card-sleeve flipped") {
      elementRef.current.className = "card-sleeve";
      setTimeout(() => animateFlip(i + 1), 1500);
    } else {
      elementRef.current.className = "card-sleeve flipped";
      imageElement.current.src = randomCards[i].image;
      setTimeout(() => animateFlip(i + 1), 1500);
    }
  };

  if (!cards) return <div>Loading...</div>;

  return (
    <>
      <div ref={eRef} className="card-sleeve">
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
