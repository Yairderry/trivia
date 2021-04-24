import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../actions";

export default function Login() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  return (
    <div>
      <p>Enter name here:</p>
      <input ref={inputRef} />
      <button
        onClick={() => {
          dispatch(createUser(inputRef.current.value));
        }}
      >
        Start
      </button>
    </div>
  );
}
