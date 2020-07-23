import axios from 'axios';
import { FETCH_CURRENT_USER, ERROR_IN_FETCH } from '../types/user';
import { api } from '../../apiUrl'

  export const fetchCurrentUser = () => {
    return async function (dispatch, getState) {
    console.log('enterhere')

      function onSuccess(response) {
    console.log('SUCCES', response)

        dispatch({ type: FETCH_CURRENT_USER, payload: response.data })
      }
  
      function onError(error) {
    console.log('ERROR', error)

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
