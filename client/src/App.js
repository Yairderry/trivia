import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Login from "./components/Login";
import Game from "./components/Game";
import Scoreboard from "./components/Scoreboard/Scoreboard";
import { getUser } from "./actions";

function App() {
  const { playing } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className="App">
      <h1 className="logo">Mr. WorldWide</h1>
      {playing ? (
        <Game />
      ) : (
        <>
          <Login />
          <Scoreboard />
        </>
      )}
    </div>
  );
}

export default App;
