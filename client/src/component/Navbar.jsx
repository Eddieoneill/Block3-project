import { useState } from "react";
import { useNavigate } from "react-router-dom";
import playButtonHoverSound from "../support/buttonHoverSound";
import "../css/App.css";

function Navbar({ setSlowLoading }) {
  const navigate = useNavigate();

  const pokerButtonClicked = () => {
    setSlowLoading(false);
    navigate("/poker");
  };
  const homeButtonClicked = () => {
    setSlowLoading(false);
    navigate("/");
  };
  return (
    <>
      <nav className="nav-container">
        <div>
          <button
            onClick={homeButtonClicked}
            onMouseEnter={playButtonHoverSound}
          >
            Home
          </button>
        </div>
        <div className="center-buttons">
          <button
            onClick={pokerButtonClicked}
            onMouseEnter={playButtonHoverSound}
          >
            Poker
          </button>
          <button
            onClick={() => navigate("/")}
            onMouseEnter={playButtonHoverSound}
          >
            Blackjack
          </button>
        </div>
        <div className="info-container">
          <div className="info-text-container">
            <div>Name:</div>
            <div>Credit:00000000</div>
          </div>
          <div className="info-button-container">
            <button>Add funs</button>
            <button
              onClick={() => navigate("/")}
              onMouseEnter={playButtonHoverSound}
            >
              Log-out
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
