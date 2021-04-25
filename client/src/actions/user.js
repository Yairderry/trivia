import axios from "axios";

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

export const createUser = (name) => {
  return (dispatch) => {
    if (!name) return;

    dispatch({ type: SET_USER_LOADER });
    axios
      .post(`api/user/new?userName=${name}`)
      .then((data) =>
        dispatch({ type: SET_USER, payload: { ...data.data, onBreak: false } })
      )
      .catch((err) => {
        errorFade(dispatch, err.response.data);
      });
  };
};
