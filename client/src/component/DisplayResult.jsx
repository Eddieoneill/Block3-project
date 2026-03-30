import { useState, useEffect, useContext, useRef } from "react";
import "../css/DisplayResult.css";
import playCardFlipSound from "../support/cardFlipSound";
import AppContext from "../context/AppContext";
import post from "../support/post";
import { useNavigate } from "react-router-dom";

function DisplayResult({ gameResult, isRemoved, setIsRemoved }) {
  const winAnimation = (
    <img
      className="result-animation"
      src="./Win.gif"
      onClick={() => removeSelf()}
    />
  );
  const lossAnimation = (
    <img
      className="result-animation"
      src="./Lose.gif"
      onClick={() => removeSelf()}
    />
  );

  const removeSelf = () => {
    setIsRemoved(true);
  };

  if (isRemoved) return;

  if (gameResult.split(" ")[1] === "Won!") {
    return winAnimation;
  } else {
    return lossAnimation;
  }
}

export default DisplayResult;
