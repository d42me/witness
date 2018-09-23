/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import store from './src/configureStore';
import { Spinner } from './src/components/common';
import Router from './src/Router';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      isInitialStart: false
    };
  }
  componentWillMount() {
    this.isInitialStart().then(value => {
      this.setState({ hasLoaded: true, isInitialStart: value });
    });
  }

  componentDidMount() {}

  isInitialStart() {
    return new Promise(resolve => {
      AsyncStorage.getItem('@hasSeenIntro2').then(value => {
        if (value) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  render() {
    return (
      <Provider store={store}>
        {this.state.hasLoaded ? (
          <Router isInitialStart={this.state.isInitialStart} />
        ) : (
          <Spinner />
        )}
      </Provider>
    );
  }
}
