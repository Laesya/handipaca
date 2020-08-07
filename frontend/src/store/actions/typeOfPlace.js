import axios from 'axios';
import {  CREATE_TYPE_PLACE, ERROR_IN_TYPE_PLACES, FETCH_TYPES_PLACES } from '../types/typeOfPlace';
import { api } from '../../apiUrl'

  export const createTypePlace = (typePlaceData) => {
    return async function (dispatch, getState) {
      function onSuccess(response) {
        dispatch({ type: CREATE_TYPE_PLACE, payload: response.data });
        return { response, status: 'success' };
      }
      function onError(error) {
        dispatch({ type: ERROR_IN_TYPE_PLACES, error });
        return { error, status: 'error' };
      }
      try {
        const response = await axios.post(`${api}/types/places/`, typePlaceData,
          { headers: { Authorization: `bearer ${getState().auth.user.token}` } }
        );
        return onSuccess(response);
      }
      catch (err) {
        return onError(err);
      }
    };
  };

  export const fetchTypesPlaces = () => {
    return async function (dispatch, getState) {
      function onSuccess(response) {
        dispatch({ type: FETCH_TYPES_PLACES, payload: response.data })
      }
  
      function onError(error) {
        dispatch({ type: ERROR_IN_TYPE_PLACES, payload: error })
      }
      try {
        const response = await axios.get(`${api}/types/places/`, {
          headers: { Authorization: `bearer ${getState().auth.user.token}` }
        })
        onSuccess(response)
      }
      catch (err) {
        onError(err)
      }
    }
  }