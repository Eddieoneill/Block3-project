import { useState, useEffect, useContext, useRef } from "react";
import "../css/Card.css";
import AppContext from "../context/AppContext";
import post from "../support/post";
import { useNavigate } from "react-router-dom";

function Card({ card, isRotated }) {
  const backCardImage = "/BackCardImage.png";
  const eRef = useRef(null);
  const rotateFront = useRef(null);
  const rotateBack = useRef(null);
  const [elementRef, setElementRef] = useState(null);

  useEffect(() => {
    setElementRef(eRef);
    if (isRotated) {
      rotateFront.current.className = "card2 rotate";
      rotateBack.current.className = "card2 rotate";
    }
  }, [eRef]);

  const cardClicked = () => {
    if (elementRef.current.className === "card-sleeve2 flipped") {
      elementRef.current.className = "card-sleeve2";
    } else {
      elementRef.current.className = "card-sleeve2 flipped";
    }
  };

  console.log(card);
  return (
    <div ref={eRef} className="card-sleeve2" onClick={cardClicked}>
      <div className="card-sleeve-inner2">
        <div className="front2">
          <img
            ref={rotateFront}
            className="card2"
            src={backCardImage}
            alt="backCard"
          />
        </div>
        <div className="back2">
          <img ref={rotateBack} className="card2" src={card} alt="backCard" />
        </div>
      </div>
    </div>
  );
}

export default Card;
