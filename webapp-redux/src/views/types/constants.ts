import { state } from '../store/configureStore'

// define initial state of app
export const initialState: state = {
  str: '',
  name: 'ball player',
  id: 13110,
  startDate: '01/01/1990',
  endDate: new Date().toString(),
  vorp: 0.00
}
