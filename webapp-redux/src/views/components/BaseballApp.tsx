import React, { Component } from 'react';
import NameSearch from './NameSearch';
import SubmitSearch from './submitData';
declare let module: any;

// Main class for BaseballApp that is container for NameSearch and SubmitSearch
class BaseballApp extends Component {
  render() {
    return (
      <div className="app">
        <NameSearch />
        <br />
        <SubmitSearch />
      </div>
    );
  }
}

// allow hot changes
if(module.hot){
  module.hot.accept();
}

export default BaseballApp
