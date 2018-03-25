import React, { Component } from 'react';
import AppNavigator from './src/navigators/Navigator'
import {Provider} from "react-redux";
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from './src/redux/reducers';
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger()
const store = createStore(reducers, applyMiddleware(thunkMiddleware, loggerMiddleware));

export default class App extends Component{
  render() {
    return (
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    );
  }
}