import { useState, useEffect, useContext } from "react";
import AppContext from "../context/AppContext";
import post from "../support/post";
import { useNavigate } from "react-router-dom";

function Poker() {
  const { user, cards } = useContext(AppContext);
  const [seed, setSeed] = useState(null);
  const [gameRunning, setGameRunning] = useState(false);

  const getSeet = async () => {
    setSeed(
      await post("http://localhost:8000/cards/shaffle", {
        id: user.id,
        game: "poker",
      }),
    );
    setGameRunning(true);
  };
  useEffect(() => {
    if (!gameRunning) {
      getSeet();
    }
  }, [gameRunning]);

  if (!seed) return <div>Loading...</div>;
  console.log(seed[0].seed);
  return (
    <>
      <div>This is where you play poker</div>
      <div>seed</div>
    </>
  );
}

export default Poker;
