import { state } from '../store/configureStore';
import { actionTypes, getNameMatch } from '../actions/nameSearch';
import { RootAction } from 'BaseballTypes';
import { initialState } from '../types/constants'

interface nameQuery {
  message: string
}

// reducer function to update state based on actions that were sent
export default function nameReducer (state: state = initialState, action: RootAction): any {
  switch(action.type) {
    case actionTypes.NAME_MATCH_FOUND: {
      return {...state, name: action.payload[0], str: action.payload[1], id: action.payload[2]}
    }
    case actionTypes.SET_START_DATE: {
      return{...state, startDate: action.payload}
    }
    case actionTypes.SET_END_DATE: {
      return{...state, endDate: action.payload}
    }
    case actionTypes.VORP_SUCCESS: {
      return{...state, startDate: action.payload[0], endDate: action.payload[1], vorp: action.payload[2]}
    }
    default:
      // return state
      return new Promise((res) => {state});
  }
}
