import { CREATE_TYPE_PMR, ERROR_IN_CREATE } from '../types/typeOfHandi';

const defaultStates = {
  typeOfHandi: {}
};

export default function (state = defaultStates, action) {
  switch (action.type) {
    case CREATE_TYPE_PMR:
      return { ...state, typeOfHandi: { ...action.payload } };
    case ERROR_IN_CREATE:
      return state;
    default:
      return state;
  }
};
