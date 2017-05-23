import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import configs from './configs';
import reducers from './store';
import Router from './Router';

class App extends Component {
  componentDidMount() {
    console.log('initialize firebase');
    // Initialize Firebase
    firebase.initializeApp(configs.firebase);
  }
  
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider >
    );
  }
}

export default App;
