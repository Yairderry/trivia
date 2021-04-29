import React from "react";

export default function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  return (
    <div>
      <input type="text" className="input-name" ref={nameRef} />
      <input type="email" className="input-name" ref={emailRef} />
      <input type="password" className="input-password" ref={passwordRef} />
      <button className="submit-btn" onClick={() => {}}>
        Submit
      </button>
    </div>
  );
}
