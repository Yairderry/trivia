import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions";

export default function Login() {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  return (
    <div className="login">
      <p>Enter name here:</p>
      <input type="email" className="input-name" ref={emailRef} />
      <input type="password" className="input-password" ref={passwordRef} />
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
        login!
      </button>
      <button className="register-btn" onClick={() => {}}>
        Register
      </button>
    </div>
  );
}
