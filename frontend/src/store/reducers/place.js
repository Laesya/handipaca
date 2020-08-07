import { BUILD_PLACE, FETCH_PLACES, CREATE_PLACE, RESET_PLACE, BUILD_PLACE_LAYOUTS } from '../types/place';

const initialState = {
  places: [],
  place: {
    name: "",
    street: "",
    nbStreet: "",
    city: "",
    zip: null,
    note: null,
    typePlaceId: null,
    userId: null,
    layoutIds: [],
  }
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case RESET_PLACE:
      return { ...state, 
        places: [...state.places], 
        place : { ...initialState.place , layoutIds : []} }
    case CREATE_PLACE:
      const { places } = state;
      places.push(payload)
      return { ...state, places: [...places], place: initialState.place }
    case FETCH_PLACES:
      return { ...state, places: [...payload] }
    case BUILD_PLACE_LAYOUTS:
      let { layouts } = state.place;
      if (layouts.length < 10 && (!layouts.map(layout => layout.id).includes(payload.layoutId))) {
        layouts.push({ id: payload.layoutId })
      } else {
        const layoutIds = layouts.map(layout => layout.id)
        const index = layoutIds.indexOf(payload.layoutId)
        layouts.splice(index, 1);
      }
      return {
        ...state,
        place: {
          ...state.place,
          layouts: [...layouts],
        }
      }

    case BUILD_PLACE:
      return {
        ...state,
        place: {
          ...payload
        }
      }

    default:
      return state
  }

}
