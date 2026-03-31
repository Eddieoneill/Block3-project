import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../css/Login.css";
import playButtonHoverSound from "../support/buttonHoverSound";
import post from "../support/post";

export default function Login({ setIsLoggedIn, setSlowLoading, setUser }) {
  const navigate = useNavigate();
  const usernameText = useRef(null);
  const passwordText = useRef(null);

  const createButtonPressed = async () => {
    const username = usernameText.current.value;
    const password = passwordText.current.value;

    if (!username || !password) {
      alert("Please enter usename and password");
      return;
    }

    const postResult = await post("http://localhost:8000/auth/register", {
      username: username,
      password: password,
    });

    if (!postResult.message) {
      if (Array.isArray(postResult)) {
        setUser(postResult[0]);
      } else {
        setUser(postResult);
      }
      setIsLoggedIn(true);
      setSlowLoading(false);
      navigate("/");
    } else {
      alert(postResult.message);
    }
  };

  const loginButtonPressed = async () => {
    const username = usernameText.current.value.toLowerCase();
    const password = passwordText.current.value;
    if (!username || !password) {
      alert("Please enter usename and password");
      return;
    }

    const postResult = await post("http://localhost:8000/auth/login", {
      username: username,
      password: password,
    });

    if (!postResult.message) {
      setUser(postResult.user);
      setIsLoggedIn(true);
      setSlowLoading(false);
      navigate("/");
    } else {
      alert(postResult.message);
    }
  };

  const enterPressed = (event) => {
    let key = event.key;
    // console.log(usernameText.current.value);
    if (key === "Enter") {
      loginButtonPressed();
    }
  };

  const updatePassword = (event) => {
    let key = event.key;
    const tempPassword = password;

    if (key !== "Backspace" && key.length > 1) return;
    if (key === "Backspace") {
      tempPassword.pop();
      setPassword(tempPassword);
    } else {
      tempPassword.push(key);
      setPassword(tempPassword);
    }

    console.log("password", password);
  };

  return (
    <div className="login-container">
      <div className="grid-container">
        <div className="grid-column">
          <div className="login-title">Username: </div>
          <input
            className="login-text"
            id="userName"
            type="text"
            onKeyDown={enterPressed}
            ref={usernameText}
          />
        </div>
        <div className="grid-column">
          <div className="login-title">Password: </div>
          <input
            className="login-text"
            id="password"
            type="password"
            onKeyDown={enterPressed}
            ref={passwordText}
          />
        </div>
        <div className="confirm">
          <button
            className="login-button"
            id="login"
            onClick={loginButtonPressed}
            onMouseEnter={playButtonHoverSound}
          >
            Login
          </button>
          <button
            className="login-button"
            id="create"
            onClick={createButtonPressed}
            onMouseEnter={playButtonHoverSound}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
