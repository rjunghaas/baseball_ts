import React from "react";
import { baseballActions } from '../state';
import { useStateValue } from './BaseballApp';
let NAME_SEARCH_URL: string = "http://192.168.1.67:5000/player?str="

// NameSearch function for taking text entered and searching for closest player
// whose name matches the text
const NameSearch = (): any => {
  // connect to our context so that we can access state values
  const {state, dispatch} = useStateValue();

  // async function that will be triggered when text field changes to send
  // latest text to API for querying name matches
  async function getName(searchText:string): Promise<any> {
    let str:string = searchText;
    let url:string = NAME_SEARCH_URL + str;

    const response = await fetch(url);
    const data = await response.json();
    // Once response received, convert to JSON and dispatch to action creator
    dispatch(baseballActions.matchSuccess([data.message[0], str, data.message[1]]));
  }

  // render object and make value of text field equal to str property, trigger
  // getName function onchange, and show current value of nm property below
  return (
    <div>
      <input placeholder="Enter Player's Name" value={ state.str } onChange={e => getName(e.target.value)} />
      <br />
      <h3>{ state.nm }</h3>
    </div>
  );
};

export default NameSearch;
