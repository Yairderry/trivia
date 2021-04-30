import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions";
import { Link } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";

export default function Login() {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { error, loading } = useSelector((state) => state.user);
  return (
    <>
      {error && <ErrorMessage message={error} />}
      {loading && <Loader />}
      <Link to="/">Back</Link>
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
    </>
  );
}
