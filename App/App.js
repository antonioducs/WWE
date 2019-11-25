import React from 'react';
import { YellowBox } from 'react-native';

import Routes from './src/routes';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

YellowBox.ignoreWarnings(['']);

import rootReducer from './src/reducers';

const store = createStore(rootReducer, applyMiddleware(reduxThunk));


const App = prop => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
