import "./App.css";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Game from "./components/Game";

function App() {
  const { name } = useSelector((state) => state.user);
  return <div className="App">{name ? <Game /> : <Login />}</div>;
}

export default App;
