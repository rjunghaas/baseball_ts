import { state, actionInterface, actionTypes } from './state';

// Reducer which will update correct keys in state when actions are received
export const reducer = (state: state, action: actionInterface): state => {
  switch(action.type) {
    case actionTypes.NAME_MATCH_FOUND:
      return {...state, nm: action.payload[0], str: action.payload[1], id: parseInt(action.payload[2])}
    case actionTypes.SET_START_DATE:
      return {...state, startDate: action.payload[0], startDateStr: action.payload[0]}
    case actionTypes.SET_END_DATE:
      return {...state, endDate: action.payload[0], endDateStr: action.payload[0]}
    case actionTypes.VORP_SUCCESS:
      return {...state, startDate: action.payload[0], endDate: action.payload[1], vorp: parseFloat(action.payload[2])}
    case actionTypes.UPDATE_START_DATE:
      return {...state, startDateStr: action.payload[0]}
    case actionTypes.UPDATE_END_DATE:
      return {...state, endDateStr: action.payload[0]}
    default:
      return state;
  }
}
