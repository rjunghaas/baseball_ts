import React, { useReducer, createContext, useContext, Dispatch } from 'react';
import NameSearch from './NameSearch';
import SubmitSearch from './submitData';
import { state, actionInterface, initialState } from '../state';
import { reducer } from '../reducer';
import '../application.css'
declare let module: any;

// define context properties
interface IContextProps {
  state: state,
  dispatch: Dispatch<actionInterface>;
}

// instantiate context with properties
const StateContext = createContext({} as IContextProps);

// main function - note app is not a functional component as we had with redux
function BaseballApp(): any {
  // set up useReducer hook with our reducer and initialState
  // any actions received by reducer from now on will create a new state
  const [state, dispatch] = useReducer(reducer, initialState);

  // wrap our app with StateContext so that all components have access to state
  return (
    <StateContext.Provider value={{state, dispatch}}>
      <div className="app">
        <NameSearch />
        <br />
        <SubmitSearch />
        </div>
    </StateContext.Provider>
  );
}

// add hot updates
if(module.hot){
  module.hot.accept();
}

// set up useContext hook here for state
export const useStateValue = () => useContext(StateContext);
export default BaseballApp
