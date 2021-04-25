import "./App.css";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Game from "./components/Game";
import Scoreboard from "./components/Scoreboard/Scoreboard";

function App() {
  const { playing } = useSelector((state) => state.user);
  return (
    <div className="App">
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
