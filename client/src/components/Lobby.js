import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions";
import Scoreboard from "./Scoreboard/Scoreboard";

export default function Lobby() {
  const dispatch = useDispatch();
  const { name, topScore } = useSelector((state) => state.user);
  return (
    <div>
      <div className="info-user">
        <span className="info-user-username">Welcome {name}</span>
        <span className="info-user-secondrow">
          <span>Top Score: {topScore}</span>
        </span>
      </div>
      <Link to="/game">Start</Link>
      <button onClick={() => dispatch(logoutUser())}>Logout</button>
      <Scoreboard />
    </div>
  );
}
