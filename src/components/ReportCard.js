/* eslint-disable import/prefer-default-export */
import React from 'react';
// import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Tile, Title, Image, Subtitle, Caption } from '@shoutem/ui';

const propTypes = {};

const ReportCard = props => {
  const { subject, location, hasHappened, members, notes } = props.report;
  let cardStyle = styles.card;
  if (props.isFirstCard) {
    cardStyle = styles.cardWithPadding;
  }
  return (
    <Tile style={cardStyle}>
      <View styleName="content" style={styles.contentWrapper}>
        <Subtitle>Subject: {subject}</Subtitle>
        <Caption>Where? {location}</Caption>
        <Caption>
          Has something like this happened before? {hasHappened}
        </Caption>
        <Caption>Was anyone else there? {members}</Caption>
        <Caption>Any additional notes? {notes}</Caption>
      </View>
    </Tile>
  );
};

ReportCard.propTypes = propTypes;

const styles = {
  questionnairePanel: {},
  card: {
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 300,
    height: 50
  },
  contentWrapper: {
    paddingLeft: 10
  },
  cardWithPadding: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 300,
    height: 400,
    paddingLeft: 20
  },
  btnStyle: {
    width: 300
  }
};

export { ReportCard };
