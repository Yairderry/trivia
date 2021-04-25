import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import User from "./User";
import { getScoreboard } from "../../actions";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";

export default function Scoreboard() {
  const { scoreboard, error, loading } = useSelector((state) => state.board);
  const { playing } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getScoreboard());
  }, [playing]);
  return (
    <div>
      {error && <ErrorMessage message={error} />}
      {loading && <Loader />}
      {scoreboard.map((user, i) => (
        <User key={i} user={user} />
      ))}
    </div>
  );
}
