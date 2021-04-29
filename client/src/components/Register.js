import React, { useRef } from "react";

export default function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
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
      <button className="submit-btn" onClick={() => {}}>
        Register
      </button>
    </div>
  );
}
