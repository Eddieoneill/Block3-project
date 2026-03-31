import { useState, useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import playButtonHoverSound from "../support/buttonHoverSound";
import "../css/App.css";

function Navbar({ setSlowLoading }) {
  const { user, setIsLoggedIn } = useContext(AppContext);
  const { credit, username } = Array.isArray(user) ? user[0] : user;
  const navigate = useNavigate();

  const pokerButtonClicked = () => {
    setSlowLoading(false);
    navigate("/poker");
  };
  const blackjackButtonClicked = () => {
    setSlowLoading(false);
    navigate("/blackjack");
  };
  const homeButtonClicked = () => {
    navigate("/");
  };

  useEffect(() => {
    console.log(user.credit);
  }, [user]);
  return (
    <>
      <nav className="nav-container">
        <div className="left-container">
          <button
            className="left-buttons"
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
            onClick={blackjackButtonClicked}
            onMouseEnter={playButtonHoverSound}
          >
            Blackjack
          </button>
          <button
            onClick={() => navigate("/Showcards")}
            onMouseEnter={playButtonHoverSound}
          >
            Show Cards
          </button>
        </div>
        <div className="info-container">
          <div className="info-text-container">
            <div>Name: {username}</div>
            <div>Credit: ${credit}</div>
          </div>
          <div className="info-button-container">
            <button
              onClick={() => navigate("/addfunds")}
              onMouseEnter={playButtonHoverSound}
            >
              Add funds
            </button>
            <button
              onClick={() => setIsLoggedIn(false)}
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
