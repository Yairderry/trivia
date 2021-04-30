import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions";
import { Link } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";

export default function Register() {
  const { error, loading } = useSelector((state) => state.user);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();

  return (
    <>
      {error && <ErrorMessage message={error} />}
      {loading && <Loader />}
      <Link to="/">Back</Link>
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
    </>
  );
}
