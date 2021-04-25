import React from "react";

export default function User({ user }) {
  const { playing, name, score } = user;
  return (
    <div className="user-score-board">
      <span>{name}</span>
      <span>{score}</span>
      <span>{playing ? "Still Playing" : "Final score"}</span>
    </div>
  );
}
