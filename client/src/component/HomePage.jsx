import { useState, useEffect, useContext } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import "../css/HomePage.css";

function HomePage() {
  const { user } = useContext(AppContext);
  return <h1>Welcome {user.username} to FREEDOM Casino!</h1>;
}

export default HomePage;
