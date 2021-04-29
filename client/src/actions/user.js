import axios from "../Network/NetworkWrapper";
import Cookies from "js-cookie";

export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";
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

export const clearUser = () => ({
  type: CLEAR_USER,
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
  return (dispatch) => {
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
        errorFade(dispatch, err.message);
      });
  };
};

export const registerUser = (newUser) => {
  return async (dispatch) => {
    dispatch({ type: SET_USER_LOADER });

    await axios.post(`api/user/register`, newUser).catch((err) => {
      errorFade(dispatch, err.message);
    });

    const { email, password } = newUser;

    const data = await axios
      .post(`api/user/login`, { email, password })
      .catch((err) => {
        errorFade(dispatch, err.message);
      });

    Cookies.set("accessToken", `Bearer ${data.data.accessToken}`, {
      expires: 1,
    });
    Cookies.set("refreshToken", data.data.refreshToken, { expires: 1 });
    dispatch({
      type: SET_USER,
      payload: { ...data.data.userData, onBreak: false },
    });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: SET_USER_LOADER });
    const refreshToken = { refreshToken: Cookies.get("refreshToken") };
    axios
      .post(`api/user/logout`, refreshToken)
      .then(() => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        dispatch({
          type: CLEAR_USER,
        });
      })
      .catch((err) => {
        errorFade(dispatch, err.message);
      });
  };
};
