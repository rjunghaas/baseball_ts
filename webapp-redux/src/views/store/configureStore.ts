import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { initialState } from '../types/constants';
import { composeWithDevTools } from 'redux-devtools-extension';

// define our state for the app
export interface state {
  str: string,
  name: string,
  id: number,
  startDate: string,
  endDate: string,
  vorp: number
}

// create store and add middleware for debugging with Chrome extension
export default function configureStore(initialState: object) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
}
