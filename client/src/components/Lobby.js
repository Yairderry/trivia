import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../actions";

export default function Lobby() {
  const dispatch = useDispatch();
  return (
    <div>
      <Link to="/game">Start</Link>
      <button onClick={() => dispatch(logoutUser())}>Logout</button>
    </div>
  );
}
