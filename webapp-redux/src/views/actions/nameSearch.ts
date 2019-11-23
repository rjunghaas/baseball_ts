import { action } from 'typesafe-actions';
import { state } from '../store/configureStore';
import { Dispatch } from 'redux';

// set interface for action to include type (to be used with reducer)
// and payload object
export interface action {
  type: string,
  payload: string
}

// define actionTypes that will be sent to reducer
export enum actionTypes {
  NAME_MATCH_FOUND = 'NAME_MATCHED',
  SET_START_DATE = 'START_DATE',
  SET_END_DATE = 'END_DATE',
  VORP_SUCCESS = 'VORP_FOUND'
}

// use typesafe-actions to define the shape of our actions
export const baseballActions = {
  matchSuccess: (payload: string[]) => action(actionTypes.NAME_MATCH_FOUND, payload),
  setStartDate: (payload: string) => action(actionTypes.SET_START_DATE, payload),
  setEndDate: (payload: string) => action(actionTypes.SET_END_DATE, payload),
  vorpSuccess: (payload: string[]) => action(actionTypes.VORP_SUCCESS, payload)
}

// first action creator which constructs URL to call our API, waits for response,
// and packs up response into action to send to reducer
export const getNameMatch = (queryStr: string): any => {
  // Construct URL for API call
  let url: string = 'http://localhost:5000/player?str=' + queryStr;

  // Calls API to get players name and id that matches queryStr
  // Once response received, if no error, dispatches the response to reducer
  return (dispatch: any) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((res) => {
        return res.json()
      })
      .then((name) => {
        dispatch(baseballActions.matchSuccess([name.message[0], queryStr, name.message[1]]));
      })
  };
}

// action creator for setting date (component already validated date) in state
export const setDate = (dateType: string, date: string): any => {
  return(dispatch: any) => {
    if(dateType == "startDate") {
      dispatch(baseballActions.setStartDate(date));
    } else if (dateType == "endDate") {
      dispatch(baseballActions.setEndDate(date));
    }
  }
}

// action creator for creating URL for API call, getting vorp results, and
// sending action with vorp to reducer
export const calcVorp = (id: string, startDate: string, endDate: string): any => {
  // Construct URL with parameters
  let url: string = "http://localhost:5000/scrape?id=" + id + "&startDate=" + startDate + "&endDate=" + endDate;

  // Get API response, parse, and attach to action to send to reducer
  return (dispatch: any) => {
    fetch(url)
      .then((response) => {
        if(!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((res) => {
        return res.json();
      })
      .then((message) => {
        dispatch(baseballActions.vorpSuccess([startDate, endDate, message.message]));
      })
  };
}
