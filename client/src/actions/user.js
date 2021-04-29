import axios from "../Network/NetworkWrapper";
import Cookies from "js-cookie";

export const SET_USER = "SET_USER";
export const START_BREAK = "START_BREAK";
export const STOP_BREAK = "STOP_BREAK";
export const SET_USER_ERROR = "SET_USER_ERROR";
export const SET_USER_LOADER = "SET_USER_LOADER";

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const setUserLoader = () => ({
  type: SET_USER_LOADER,
});

export const startBreak = () => ({
  type: START_BREAK,
});

export const stopBreak = () => ({
  type: STOP_BREAK,
});

export const setUserError = (payload) => ({
  type: SET_USER_ERROR,
  payload,
});

const errorFade = (dispatch, message) => {
  dispatch({ type: SET_USER_ERROR, payload: message });
  setTimeout(() => dispatch({ type: SET_USER_ERROR, payload: "" }), 3000);
};

export const getUser = () => {
  return (dispatch, getState) => {
    dispatch({ type: SET_USER_LOADER });
    axios
      .get(`api/user`)
      .then((data) =>
        dispatch({ type: SET_USER, payload: { ...data.data, onBreak: false } })
      )
      .catch((err) => {
        errorFade(dispatch, err.message);
      });
  };
};

export const loginUser = (user) => {
  return (dispatch) => {
    dispatch({ type: SET_USER_LOADER });
    axios
      .post(`api/user/login`, user)
      .then((data) => {
        Cookies.set("accessToken", `Bearer ${data.data.accessToken}`, {
          expires: 1,
        });
        Cookies.set("refreshToken", data.data.refreshToken, { expires: 1 });
        dispatch({
          type: SET_USER,
          payload: { ...data.data.userData, onBreak: false },
        });
      })
      .catch((err) => {
        console.log(err);
        errorFade(dispatch, err.message);
      });
  };
};
