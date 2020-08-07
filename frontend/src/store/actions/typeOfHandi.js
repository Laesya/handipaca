import axios from 'axios';
import {  CREATE_TYPE_PMR, ERROR_IN_CREATE } from '../types/typeOfHandi';
import { api } from '../../apiUrl'

  export const createTypePMR = (typeHandiData) => {
    return async function (dispatch, getState) {
      function onSuccess(response) {
        dispatch({ type: CREATE_TYPE_PMR, payload: response.data });
        return { response, status: 'success' };
      }
      function onError(error) {
        dispatch({ type: ERROR_IN_CREATE, error });
        return { error, status: 'error' };
      }
      try {
        const response = await axios.post(`${api}/types/pmr`, typeHandiData,
          { headers: { Authorization: `bearer ${getState().auth.user.token}` } }
        );
        return onSuccess(response);
      }
      catch (err) {
        return onError(err);
      }
    };
  };