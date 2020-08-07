import { FETCH_PLACES, CREATE_PLACE, ERROR_IN_PLACE, BUILD_PLACE_LAYOUTS, RESET_PLACE } from '../types/place';
import axios from 'axios';
import { api } from '../../apiUrl'

export function buildPlaceServices(layoutId) {
  return {
    type: BUILD_PLACE_LAYOUTS,
    payload: { layoutId }
  }
};

export const fetchPlaces = () => {
  return async function (dispatch, getState) {
    function onSuccess(response) {
      dispatch({ type: FETCH_PLACES, payload: response.data })
    }

    function onError(error) {
      dispatch({ type: ERROR_IN_PLACE, payload: error })
    }
    try {
      const response = await axios.get(`${api}/places`, {
        headers: { Authorization: `bearer ${getState().auth.user.token}` }
      })
      onSuccess(response)
    }
    catch (err) {
      onError(err)
    }
  }
}

export function fetchPlacesByLayouts(layoutsIds = []) {
  return async function (dispatch, getState) {
    function onSuccess(places) {
      dispatch({ type: FETCH_PLACES, payload: places })
    }
    function onError(error) {
      dispatch({ type: ERROR_IN_PLACE, payload: error })
    }
    try {
      const response = await axios.get(`${api}/places`, {
        headers: { Authorization: `bearer ${getState().auth.user.token}` },
        params: {
          ids: layoutsIds
        }
      })
      const places = response.data.layouts.map(layout => layout.places).flat()
      onSuccess(places)
    }
    catch (err) {
      onError(err)
    }
  }
}
    
export function createPlace(placeData) {
  return async function (dispatch, getState) {
    function onSuccess(response) {
      // set token as default header      dispatch({ type: CREATE_PLACE, payload: response.data });
      return { response, status: 'success' };
    }
    function onError(error) {
      dispatch({ type: ERROR_IN_PLACE, payload : error });
      return { error, status: 'error' };
    }
    try {
      const response = await axios.post(`${api}/places/`, placeData,
        { headers: { Authorization: `bearer ${getState().auth.user.token}` } }

      );
      return onSuccess(response);

      
    }
    catch (err) {
      return onError(err);
    }
  };

};  