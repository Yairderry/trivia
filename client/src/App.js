import "./App.css";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Game from "./components/Game";

function App() {
  const { playing } = useSelector((state) => state.user);
  return <div className="App">{playing ? <Game /> : <Login />}</div>;
}

export default App;
