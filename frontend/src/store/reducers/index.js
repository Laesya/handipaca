import { combineReducers } from "redux";
import authReducer from './auth';
import userReducer from './user';
import typeOfHandiReducer from './typeOfHandi';
import typeOfPlaceReducer from './typeOfPlace';
import typeOfLayoutReducer from './typeOfLayout';
import placeReducer from './place';

export default combineReducers({
  auth: authReducer,
  user : userReducer,
  typeOfLayout : typeOfLayoutReducer,
  typeOfPlace : typeOfPlaceReducer,
  typeOfHandi : typeOfHandiReducer,
  place : placeReducer
});