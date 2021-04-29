import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions";

export default function Login() {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  return (
    <div className="login">
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
        className="start-btn"
        onClick={() => {
          dispatch(
            loginUser({
              email: emailRef.current.value,
              password: passwordRef.current.value,
            })
          );
        }}
      >
        Login
      </button>
    </div>
  );
}
