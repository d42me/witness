/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, Button } from '@shoutem/ui';

const propTypes = {
  btnTitle: PropTypes.string.isRequired
};

const FooterPanel = props => {
  return (
    <View style={[styles.footerPanel, props.style]}>
      <Button style={styles.btnStyle} onPress={props.btnHandler}>
        <Text>{props.btnTitle}</Text>
      </Button>
    </View>
  );
};

FooterPanel.propTypes = propTypes;

const styles = {
  footerPanel: {
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    padding: 40
  },
  btnStyle: {
    width: 300
  }
};

export { FooterPanel };
