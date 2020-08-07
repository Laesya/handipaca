import axios from 'axios';
import {  CREATE_LAYOUT, FETCH_LAYOUT, FETCH_LAYOUTS, ERROR_IN_LAYOUTS, UPDATE_LAYOUT } from '../types/typeOfLayout';
import { api } from '../../apiUrl'

export const createLayout = (layoutData) => {
    return async function (dispatch, getState) {
      function onSuccess(response) {
        dispatch({ type: CREATE_LAYOUT, payload: response.data });
        return { response, status: 'success' };
      }
      function onError(error) {
        dispatch({ type: ERROR_IN_LAYOUTS, error });
        return { error, status: 'error' };
      }
      try {
        const response = await axios.post(`${api}/types/layouts/`, layoutData,
          { headers: { Authorization: `bearer ${getState().auth.user.token}` } }
        );
        return onSuccess(response);
      }
      catch (err) {
        return onError(err);
      }
    };
  };
  export function updateLayout(layout, layoutId) { // on a besoin des champs et des valeurs => serviceFields = {name: 'Mon nouveau service'} && On a aussi besoin de l'id pour savoir lequel mettre à jour
  return async function (dispatch, getState) {
    function onSuccess(response) {
      dispatch({ type: UPDATE_LAYOUT, payload: response.data.layout })
    }

    function onError(error) {
      dispatch({ type: ERROR_IN_LAYOUTS, payload: error })
    }

    try {
      const response = await axios.put(`${api}/types/layouts/${layoutId}`, layout,
       {
        headers: { Authorization: `bearer ${getState().auth.user.token}` }
      })
      onSuccess(response)
    }
    catch (err) {
      onError(err)
    }
  }
}

  export const fetchLayouts = () => {
    return async function (dispatch, getState) {
      function onSuccess(response) {
        dispatch({ type: FETCH_LAYOUTS, payload: response.data })
      }
  
      function onError(error) {
        dispatch({ type: ERROR_IN_LAYOUTS, payload: error })
      }
      try {
        const response = await axios.get(`${api}/types/layouts/`, {
          headers: { Authorization: `bearer ${getState().auth.user.token}` }
        })
        onSuccess(response)
      }
      catch (err) {
        onError(err)
      }
    }
  }
  export function fetchLayout(layoutId) {
    return async function (dispatch, getState) {
      function onSuccess(response) {
        dispatch({ type: FETCH_LAYOUT, payload: response.data.layout })
      }
  
      function onError(error) {
        dispatch({ type: ERROR_IN_LAYOUTS, payload: error })
      }
  
      try {
        const response = await axios.get(`${api}/types/layouts/${layoutId}`, {
          headers: { Authorization: `bearer ${getState().auth.user.token}` }
        })
        onSuccess(response)
      }
      catch (err) {
        onError(err)
      }
    }
  }