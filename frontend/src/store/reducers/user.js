import { FETCH_CURRENT_USER, ERROR_IN_FETCH } from '../types/user';

const defaultStates = {
  user: {
  }
};

export default function (state = defaultStates, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      return { ...state, user: { ...action.payload } };
    case ERROR_IN_FETCH:
      return state;
    default:
      return state;
  }
};
