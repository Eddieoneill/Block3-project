import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AppContext from "./context/AppContext";
import Navbar from "./component/Navbar";
import Loading from "./component/Loading";
import Login from "./component/Login";
import Poker from "./component/Poker";
import HomePage from "./component/HomePage";
import "./css/App.css";

function App() {
  const [slowLoading, setSlowLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cards, setCards] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!slowLoading) {
      setTimeout(() => {
        setSlowLoading(true);
      }, 4000);
    }
  }, [slowLoading]);

  if (!slowLoading)
    return (
      <Loading cards={cards} setCards={setCards} slowLoading={slowLoading} />
    );

  if (!isLoggedIn)
    return (
      <Login
        setIsLoggedIn={setIsLoggedIn}
        setSlowLoading={setSlowLoading}
        setUser={setUser}
      />
    );
  return (
    <AppContext.Provider value={{ user, cards, isLoggedIn, setIsLoggedIn }}>
      <h1 id="page-title">Eddie's Casino</h1>
      <Navbar setSlowLoading={setSlowLoading} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/poker" element={<Poker />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
