export const ADD_TIME = "ADD_TIME";
export const SET_TIMER_REF = "SET_TIMER_REF";
export const START_QUESTION = "START_QUESTION";
export const END_QUESTION = "END_QUESTION";
export const NEW_QUESTION = "NEW_QUESTION";
export const DECREASE_QUESTION_TIME = "DECREASE_QUESTION_TIME";
export const TIMER_TICK = "TIMER_TICK";
export const RESET_TIMER = "RESET_TIMER";

export const startQuestion = () => ({
  type: START_QUESTION,
});

export const endQuestion = () => ({
  type: END_QUESTION,
});

export const newQuestion = () => ({
  type: NEW_QUESTION,
});

export const timerTick = () => ({
  type: TIMER_TICK,
});

export const decreaseQuestionTime = () => ({
  type: DECREASE_QUESTION_TIME,
});

export const addTime = (payload) => ({
  type: ADD_TIME,
  payload,
});

export const setTimerRef = (payload) => ({
  type: SET_TIMER_REF,
  payload,
});

export const resetTimer = () => ({
  type: RESET_TIMER,
});
