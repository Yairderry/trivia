import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../actions";

export default function Login() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  return (
    <div className="login">
      <p>Enter name here:</p>
      <input className="input-name" ref={inputRef} />
      <button
        className="start-btn"
        onClick={() => {
          dispatch(createUser(inputRef.current.value));
        }}
      >
        Start!
      </button>
    </div>
  );
}
