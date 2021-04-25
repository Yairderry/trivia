import {
  ADD_TIME,
  START_QUESTION,
  END_QUESTION,
  NEW_QUESTION,
  DECREASE_QUESTION_TIME,
  TIMER_TICK,
  RESET_TIMER,
  SET_TIMER_REF,
} from "../actions";

const initialTimerValue = {
  timer: 20,
  timerRef: null,
  questionTime: 20000,
  questionStart: null,
  questionEnd: null,
  additionalTime: 0,
};

const TimerReducer = (state = initialTimerValue, { type, payload }) => {
  switch (type) {
    case ADD_TIME:
      state.additionalTime = payload * 1000;
      state.timer += payload;
      return { ...state };

    case SET_TIMER_REF:
      state.timerRef = payload;
      return { ...state };

    case START_QUESTION:
      state.questionStart = new Date().getTime();
      return { ...state };

    case END_QUESTION:
      state.questionEnd = new Date().getTime();
      return { ...state };

    case DECREASE_QUESTION_TIME:
      if (state.questionTime === 5000) return state;
      state.questionTime -= 500;
      state.timer -= 0.5;
      return { ...state };

    case TIMER_TICK:
      state.timer -= 0.5;
      return { ...state };

    case RESET_TIMER:
      return initialTimerValue;

    case NEW_QUESTION:
      state.timer = state.questionTime / 1000;
      return { ...state };

    default:
      return state;
  }
};

export default TimerReducer;
