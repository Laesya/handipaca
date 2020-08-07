import axios from 'axios';
import { FETCH_CURRENT_USER, ERROR_IN_FETCH, USER_DETAILS, ERROR_IN_DETAILS} from '../types/user';
import { api } from '../../apiUrl'

  export const fetchCurrentUser = () => {
    return async function (dispatch, getState) {
      function onSuccess(response) {
        dispatch({ type: FETCH_CURRENT_USER, payload: response.data })
      }
  
      function onError(error) {
        dispatch({ type: ERROR_IN_FETCH, payload: error })
      }
      try {
        const response = await axios.get(`${api}/users/${getState().auth.user.id}`, {
          headers: { Authorization: `bearer ${getState().auth.user.token}` }
        })
        onSuccess(response)
      }
      catch (err) {
        onError(err)
      }
    }
  }
  export const userDetails = (userData) => {
    return async function (dispatch, getState) {
      function onSuccess(response) {
        dispatch({ type: USER_DETAILS, payload: response.data });
        return { response, status: 'success' };
      }
      function onError(error) {
        dispatch({ type: ERROR_IN_DETAILS, error });
        return { error, status: 'error' };
      }
      try {
        const response = await axios.put(`${api}/users/${getState().auth.user.id }`, userData,
          { headers: { Authorization: `bearer ${getState().auth.user.token}` } }
        );
        return onSuccess(response);
      }
      catch (err) {
        return onError(err);
      }
    };
  };