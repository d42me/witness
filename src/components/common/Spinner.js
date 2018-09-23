/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';

const propTypes = {
  size: PropTypes.string,
  color: PropTypes.string
};

const defaultProps = {
  size: 'large',
  color: '#00AEFF'
};

const Spinner = ({ size, color }) => (
  <View style={styles.spinnerStyle}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export { Spinner };
