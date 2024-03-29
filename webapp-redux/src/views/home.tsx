import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import BaseballApp from './components/BaseballApp'

// Redux store that needs to wrap main app
const store = configureStore({});

render (
  <Provider store={store}>
    <BaseballApp />
  </Provider>,
  document.getElementById('app')
);
