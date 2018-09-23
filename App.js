/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src/configureStore';
import { Spinner } from './src/components/common';
import Router from './src/Router';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false
    };
  }

  componentWillMount() {
    this.setState({ hasLoaded: true });
  }

  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        {this.state.hasLoaded ? (
          <Router isLoggedIn={this.state.isLoggedIn} />
        ) : (
          <Spinner />
        )}
      </Provider>
    );
  }
}
