import { createStore, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import LocalStorage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import allReducer from './reducers';

const persistConfig = {
  key: 'handipaca',
  storage: LocalStorage,
}

const persistedReducer = persistReducer(persistConfig, allReducer);
const middleware = applyMiddleware(thunk, logger);
const store = createStore(persistedReducer, middleware);

export default store;



