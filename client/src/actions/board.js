import axios from "axios";

export const SET_BOARD = "SET_BOARD";
export const SET_BOARD_ERROR = "SET_BOARD_ERROR";
export const SET_BOARD_LOADER = "SET_BOARD_LOADER";

export const setBoard = (payload) => ({
  type: SET_BOARD,
  payload,
});

export const setBoardError = (payload) => ({
  type: SET_BOARD_ERROR,
  payload,
});

export const setBoardLoader = () => ({
  type: SET_BOARD_LOADER,
});

const errorFade = (dispatch, message) => {
  dispatch({ type: SET_BOARD_ERROR, payload: message });
  setTimeout(() => dispatch({ type: SET_BOARD_ERROR, payload: "" }), 3000);
};

export const getScoreboard = () => {
  return (dispatch) => {
    dispatch({ type: SET_BOARD_LOADER });
    axios
      .get("api/user/scoreboard")
      .then((data) => dispatch({ type: SET_BOARD, payload: data.data }))
      .catch((err) => {
        errorFade(dispatch, err.message);
      });
  };
};
