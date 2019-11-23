import React from "react";
import { baseballActions } from '../state';
import { useStateValue } from './BaseballApp';

let VORP_URL: string = "http://192.168.1.67:5000/scrape?id=";

// helper function to validate string is in proper date format
function validateDate(testdate: string) {
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
    return date_regex.test(testdate);
}

const SubmitSearch = (): any => {
  // connect to our context so that we can access state values
  const {state, dispatch} = useStateValue();

  // on changing date fields, if valid date, then set state property for correct
  // date.  Use reducer to handle these state changes
  function setDate(dateType:string, date:string): any {
    if (dateType === "startDate") {
      if(validateDate(date)) {
        let dateArr:string[] = [date];
        dispatch(baseballActions.setStartDate(dateArr));
      } else {
        dispatch(baseballActions.updateStartDate([date]));
      }
    } else if (dateType === "endDate"){
      if(validateDate(date)) {
        let dateArr:string[] = [date];
        dispatch(baseballActions.setEndDate(dateArr));
      } else {
        dispatch(baseballActions.updateEndDate([date]));
      }
    }
  }

  // Upon pressing submit button, construct URL and make call to API.
  // Take results and send to action creator to update state with new VORP
  async function getVorp(id:number, startDate:string, endDate:string): Promise<any> {
    let idStr = id.toString();
    let url:string = VORP_URL  + idStr + "&startDate=" + startDate + "&endDate=" + endDate;

    const response = await fetch(url);
    const data = await response.json();
    dispatch(baseballActions.vorpSuccess([startDate, endDate, data.message]));
  }

  // render component, connect date fields to relevant state props, set onchange
  // those fields to relevant function, and onclick for submit button to relevant
  // function.  Show rounded value of vorp property
  return (
    <div>
        <div> <h4>Start Date for Player:</h4> <br /> </div>
        <div> <input type="text" placeholder="MM/DD/YYYY" value={ state.startDateStr } onChange = { (e) => setDate("startDate", e.target.value) } /></div>
        <div> <h4>End Date for Player: </h4><br /></div>
        <div> <input type="text" placeholder="MM/DD/YYYY" value={ state.endDateStr } onChange = { (e) => setDate("endDate", e.target.value) } /></div>
        <div><input type="submit" value="Submit" name="submit" onClick = { () => getVorp(state.id, state.startDate, state.endDate) }/></div>
        <br />
        <div><h3>VORP: { state.vorp.toFixed(2) }</h3></div>
    </div>
  )
}

export default SubmitSearch;
