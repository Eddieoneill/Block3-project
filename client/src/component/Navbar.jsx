import { useState } from "react";
import playButtonHoverSound from "../support/buttonHoverSound";
import "../css/App.css";

function Navbar() {
  return (
    <>
      <nav className="nav-container">
        <div>
          <button
            onClick={() => navigate("/")}
            onMouseEnter={playButtonHoverSound}
          >
            Home
          </button>
        </div>
        <div className="center-buttons">
          <button
            onClick={() => navigate("/")}
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
        <div>
          <button
            onClick={() => navigate("/")}
            onMouseEnter={playButtonHoverSound}
          >
            User
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
