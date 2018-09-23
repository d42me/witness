/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Container = props => (
  <SafeAreaView style={[styles.container, props.style]}>
    {props.children}
  </SafeAreaView>
);

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};

Container.propTypes = propTypes;

export { Container };
