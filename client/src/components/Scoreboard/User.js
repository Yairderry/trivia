import React from "react";

export default function User({ user }) {
  const { playing, name, topScore } = user;
  return (
    <div className="user-score-board">
      <span className="user-name">{name}</span>
      <span className="user-score">{topScore}</span>
      <span className="user-playing">
        {playing ? "Still Playing" : "Final score"}
      </span>
    </div>
  );
}
