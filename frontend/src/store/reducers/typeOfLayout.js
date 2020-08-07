import { CREATE_LAYOUT, FETCH_LAYOUT, UPDATE_LAYOUT, FETCH_LAYOUTS, ERROR_IN_LAYOUTS, ERROR_IN_CREATE } from '../types/typeOfLayout';

const defaultStates = {
  layouts: [],
  typeOfLayout: {},
};

export default function (state = defaultStates, action) {
  switch (action.type) {
    case CREATE_LAYOUT:
      return { ...state, typeOfLayout: { ...action.payload } };
    case FETCH_LAYOUTS:
      return { ...state, layouts: [...action.payload] };
    case ERROR_IN_LAYOUTS:
      return state;
    default:
      return state;
  }
};