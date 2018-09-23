/* eslint-disable import/prefer-default-export */
import React from 'react';
// import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Card, Image, Subtitle, Caption } from '@shoutem/ui';

const propTypes = {};

const ReportCard = props => {
  return (
    <Card>
      <Image
        styleName="medium-wide"
        source={{
          uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-10.png'
        }}
      />
      <View styleName="content">
        <Subtitle>{props.title}</Subtitle>
        <Caption>{props.description}</Caption>
      </View>
    </Card>
  );
};

ReportCard.propTypes = propTypes;

const styles = {
  questionnairePanel: {},
  btnStyle: {
    width: 300
  }
};

export { ReportCard };
