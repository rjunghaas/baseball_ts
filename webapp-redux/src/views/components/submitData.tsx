import React, { Component } from 'react';
import { connect } from 'react-redux';
import { state } from '../store/configureStore';
import { Dispatch, bindActionCreators } from 'redux';
import { calcVorp, setDate } from '../actions/nameSearch';

// Define interface for class
// Use optional props for functions
interface submitSearchProps {
  id: string;
  startDate: string;
  endDate: string;
  vorp: string;
  setDate?: (dateType: string, date: string) => void;
  getVorp?: (id: string, startDate: string, endDate: string) => void;
}

// helper function to validate that string is properly formatted date
function validateDate(testdate: string) {
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
    return date_regex.test(testdate);
}

// Class component
class SubmitSearch extends Component<submitSearchProps, {}> {
  // Allow setDate and getVorp to be optional
  static defaultProps: Partial<submitSearchProps> = {
    setDate: (dateType: string, date: string) => Object,
    getVorp: (id: string, startDate: string, endDate: string) => Object,
  }

  constructor(props: submitSearchProps) {
    super(props);
  }

  // validate dates whenever there is a change
  // Once we have a valid date, set it as a property
  handleChange = (dateType: string, e:React.ChangeEvent<HTMLInputElement>) => {
    let date: string = e.target.value;

    if(this.props.setDate && validateDate(date)){
      this.props.setDate(dateType, date)
    }
  }

  // When user presses submit, pass start and end dates plus player ID to action creator
  handleSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
    // Get ID
    let id = this.props.id;

    // Get Start Date
    let startDate = this.props.startDate;

    // Get End Date
    let endDate = this.props.endDate;

    if(this.props.getVorp){
      this.props.getVorp(id, startDate, endDate);
    } else {
      console.log("error no findName method");
    }
  }

  render(){
    const { startDate, endDate, vorp, getVorp } = this.props;
    return(
      <div>
        <div> <h4>Start Date for Player:</h4> <br /> </div>
        <div> <input type="text" placeholder="MM/DD/YYYY" value={ startDate } onChange = { (e) => this.handleChange("startDate", e) } name="startDate" /></div>
        <div> <h4>End Date for Player: </h4><br /></div>
        <div> <input type="text" placeholder="MM/DD/YYYY" value={ endDate } onChange = { (e) => this.handleChange("endDate", e) } name="endDate" /></div>
        <div><input type="submit" value="Submit" name="submit" onClick = { this.handleSubmit }/></div>
        <br />
        <div><h3>VORP: {vorp}</h3></div>
      </div>
    );
  }
}

// map values to props of class
const mapStateToProps = (state: any) => {
  return {
    id: state.nameReducer.id,
    startDate: state.nameReducer.startDate,
    endDate: state.nameReducer.endDate,
    vorp: state.nameReducer.vorp
  }
};

// map action creators to optional function properties
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    setDate: (dateType: string, date: string) => {
      return setDate(dateType, date);
    },

    getVorp: (id: string, startDate: string, endDate: string) => {
      return calcVorp(id, startDate, endDate);
    }
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitSearch);
