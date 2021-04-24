import axios from "axios";

export const SET_USER = "SET_USER";
export const SET_USER_ERROR = "SET_USER_ERROR";
export const SET_USER_LOADER = "SET_USER_LOADER";

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const setUserLoader = () => ({
  type: SET_USER_LOADER,
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
      .then((data) => dispatch({ type: SET_USER, payload: data.data }))
      .catch((err) => {
        errorFade(dispatch, err.response.data);
      });
  };
};
