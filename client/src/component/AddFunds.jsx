import { useState, useEffect, useContext, useRef } from "react";
import AppContext from "../context/AppContext";
import playButtonHoverSound from "../support/buttonHoverSound";
import { useNavigate } from "react-router-dom";
import post from "../support/post";
import "../css/HomePage.css";

export default function AddFunds() {
  const navigate = useNavigate();
  const amountText = useRef(null);
  const { user, setUser } = useContext(AppContext);
  const updatedUser = { ...user };

  const fundsButtonPressed = async () => {
    const amount = Number(amountText.current.value);
    if (!amount) {
      alert("Please enter an sufficient amount");
      return;
    }

    const postResult = await post(`http://localhost:8000/users/${user.id}`, {
      credit: amount + user.credit,
    });

    if (!postResult.message) {
      updatedUser.credit = amount + user.credit;
      setUser(updatedUser);
      alert("You have successfully addded funds!");
      navigate("/");
    } else {
      alert(postResult.message);
    }
  };

  const enterPressed = (event) => {
    let key = event.key;
    // console.log(usernameText.current.value);
    if (key === "Enter") {
      fundsButtonPressed();
    }
  };

  return (
    <div className="login-container">
      <div className="grid-container">
        <div className="grid-column">
          <div className="login-title">Amount: $</div>
          <input
            className="login-text"
            id="userName"
            type="number"
            onKeyDown={enterPressed}
            ref={amountText}
          />
        </div>
        <button
          className="login-button"
          id="login"
          onClick={fundsButtonPressed}
          onMouseEnter={playButtonHoverSound}
        >
          Add
        </button>
      </div>
    </div>
  );
}
