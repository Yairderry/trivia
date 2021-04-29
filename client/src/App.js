import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Link, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import Login from "./components/Login";
import Game from "./components/Game";
import Scoreboard from "./components/Scoreboard/Scoreboard";
import { getUser } from "./actions";
import Register from "./components/Register";
import Home from "./components/Home";
import Lobby from "./components/Lobby";

function App() {
  const { id } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className="App">
      <h1 className="logo">Mr. WorldWide</h1>
      <BrowserRouter>
        {id ? <Redirect to="/lobby" /> : <Redirect to="/" />}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/lobby" component={Lobby} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/game" component={Game} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
