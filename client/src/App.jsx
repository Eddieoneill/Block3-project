import { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import Loading from "./component/Loading";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./css/App.css";

function App() {
  const [slowLoading, setSlowLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSlowLoading(true);
    }, 5000);
  }, []);

  if (!slowLoading) return <Loading />;
  return (
    <>
      <h1 id="page-title">Eddie's Casino</h1>
      <Navbar />
      <Routes>
        <Route path="/" />
      </Routes>
    </>
  );
}

export default App;
