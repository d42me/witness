/* eslint-disable import/prefer-default-export */
import React from 'react';
// import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, Button, Heading, TextInput } from '@shoutem/ui';

const propTypes = {};

const Questionnaire = props => {
  return (
    <View style={[styles.questionnairePanel, props.style]}>
      <Heading>{props.question}</Heading>
      <Button style={styles.btnStyle} onPress={props.btnHandlers}>
        <Text>{props.btnTitle}</Text>
      </Button>
      <TextInput
        placeholder={props.placeholder}
        defaultValue={props.answerInputText}
        onChangeText={text => props.onAnswerEnter(text)}
      />
    </View>
  );
};

Questionnaire.propTypes = propTypes;

const styles = {
  questionnairePanel: {},
  btnStyle: {
    width: 300
  }
};

export { Questionnaire };
