import React, { Component } from 'react';
import { connect } from 'react-redux';
import { state } from '../store/configureStore';
import { getNameMatch } from '../actions/nameSearch';
import { Dispatch, bindActionCreators } from 'redux';

// Define interface for nameSearchProps with findName as optional.
// Won't pass in this function until later so needs to be optional
interface nameSearchProps {
  searchText: string;
  name: string;
  findName?: (str: string) => void;
}

// Class component for NameSearch
class NameSearch extends Component<nameSearchProps, {}> {
  // Allow findName to be optional
  static defaultProps: Partial<nameSearchProps> = {
    findName: (str: string) => Object,
  }

  constructor(props: nameSearchProps) {
    super(props);
  }

  // function for calling findName when nameSearch changes
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // get value in text field
    let s: string = '';
    if(e.target.value) {
      s = e.target.value;
    }

    // call findName if we have it defined
    if (this.props.findName) {
      this.props.findName(s);
    } else {
      console.log("error no findName method");
    }
  }

  // map value in text field to state using searchText value
  render(){
    const { searchText, name, findName } = this.props;
    return(
      <div>
        <input placeholder="Enter Player's Name" value={ searchText } onChange={ this.handleChange } name="input"/>
        <br />
        <h3>{name}</h3>
      </div>
    );
  }
}

// map value in text field and most recent name returned from search to class props
const mapStateToProps = (state: any) => {
  return {
    searchText: state.nameReducer.str,
    name: state.nameReducer.name
  }
};

// map findName to getNameMatch action creator where we will pass it string to query API
// this is where we define our findName prop
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    findName: (str: string) => {
      return getNameMatch(str);
    }
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NameSearch);
