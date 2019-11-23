import { action } from 'typesafe-actions';

// state object of app that will be stored in StateContext
export interface state {
  str: string,
  nm: string,
  id: number,
  startDateStr: string,
  endDateStr: string,
  startDate: string,
  endDate: string,
  vorp: number
}

// actions interface with type (for reducer) and payload
export interface actionInterface {
  type: string,
  payload: string[]
}

// initial state of the app
export const initialState = {
  str: "",
  nm: "",
  id: 13110,
  startDateStr: '',
  endDateStr: '',
  startDate: '01/01/1990',
  endDate: '12/31/2020',
  vorp: 0.00
}

// constants for action type strings
export enum actionTypes {
  NAME_MATCH_FOUND = 'NAME_MATCHED',
  SET_START_DATE = 'START_DATE',
  SET_END_DATE = 'END_DATE',
  VORP_SUCCESS = 'VORP_FOUND',
  UPDATE_START_DATE = 'UPDATE_START_DATE',
  UPDATE_END_DATE = 'UPDATE_END_DATE'
}

// mapping action creators to their action types
export const baseballActions = {
  matchSuccess: (payload: string[]) => action(actionTypes.NAME_MATCH_FOUND, payload),
  setStartDate: (payload: string[]) => action(actionTypes.SET_START_DATE, payload),
  setEndDate: (payload: string[]) => action(actionTypes.SET_END_DATE, payload),
  vorpSuccess: (payload: string[]) => action(actionTypes.VORP_SUCCESS, payload),
  updateStartDate: (payload: string[]) => action(actionTypes.UPDATE_START_DATE, payload),
  updateEndDate: (payload: string[]) =>  action(actionTypes.UPDATE_END_DATE, payload)
}
