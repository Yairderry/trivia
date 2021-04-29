import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../actions";

export default function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  return (
    <div>
      <input
        type="text"
        className="input-name"
        ref={nameRef}
        placeholder="enter your name"
      />
      <input
        type="email"
        className="input-name"
        ref={emailRef}
        placeholder="enter your email"
      />
      <input
        type="password"
        className="input-name"
        ref={passwordRef}
        placeholder="enter your password"
      />
      <button
        className="submit-btn"
        onClick={() => {
          dispatch(
            registerUser({
              name: nameRef.current.value,
              email: emailRef.current.value,
              password: passwordRef.current.value,
            })
          );
        }}
      >
        Register
      </button>
    </div>
  );
}
