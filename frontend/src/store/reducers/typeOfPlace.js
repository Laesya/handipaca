import { CREATE_TYPE_PLACE, FETCH_TYPE_PLACE, UPDATE_TYPE_PLACE, FETCH_TYPES_PLACES, ERROR_IN_TYPE_PLACES, DELETE_TYPE_PLACE  } from '../types/typeOfPlace';

const defaultStates = {
  places: [],
  typeOfPlace: {}
};

export default function (state = defaultStates, action) {
  switch (action.type) {
    case CREATE_TYPE_PLACE:
      return { ...state, typeOfPlace: { ...action.payload } };
    case FETCH_TYPES_PLACES:
      return { ...state, places: [...action.payload] };
    case ERROR_IN_TYPE_PLACES:
      return state;
    default:
      return state;
  }
};
