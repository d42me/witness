import React, { Component } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Screen, View, Button, Icon } from '@shoutem/ui';
import { Actions as NavigationActions } from 'react-native-router-flux';
import { FooterPanel, Questionnaire } from '../../components';
import { createReport } from '../../actions';

const questionKeys = ['subject', 'location', 'hasHappened', 'members', 'notes'];

const questions = [
  'What happened?',
  'Where were you?',
  'Has something like this happened before?',
  'Was anyone else there?',
  'Any additional notes?'
];

const placeholders = [
  'Tell your story here...',
  'Give as much detail as you can remember...',
  'Give as much detail as you can remember...',
  'Give as much detail as you can remember...',
  'Give as much detail as you can remember...'
];

const stepsCount = questions.length;

class CreateReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      currentStep: 0,
      currentAnswer: ''
    };
    this.onAnswerEnter = this.onAnswerEnter.bind(this);
    this.moveToNextStep = this.moveToNextStep.bind(this);
  }

  componentWillMount() {}

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      this.backAndroid()
    );
  }

  onAnswerEnter(answer) {
    this.setState({
      currentAnswer: answer
    });
  }

  presentCreateReport() {
    NavigationActions.createReport();
  }

  goBack() {
    const { currentStep, answers } = this.state;
    const previousStep = currentStep - 1;
    if (previousStep >= 0) {
      const recoveredInputText = answers[previousStep];
      this.setState({
        currentStep: previousStep,
        currentAnswer: recoveredInputText
      });
    } else {
      NavigationActions.intro();
    }
  }

  moveToNextStep() {
    const { answers, currentAnswer, currentStep } = this.state;

    const temp = answers;
    temp[currentStep] = currentAnswer;
    console.log(answers);
    this.setState({
      answers: temp
    });

    const nextStep = currentStep + 1;
    if (nextStep < stepsCount) {
      this.setState({
        currentStep: nextStep,
        currentAnswer: ''
      });
    } else {
      // Present next scene and before send data
      const reportData = { keys: questionKeys, answers };
      this.props.createReport(reportData);
      // NavigationActions.home();
    }
  }

  render() {
    const { currentStep } = this.state;
    return (
      <Screen style={{ flex: 1 }}>
        <View style={styles.contentWrapper}>
          <Button
            styleName="clear"
            style={styles.backBtn}
            onPress={() => this.goBack()}
          >
            <Icon name="back" />
          </Button>
          <Questionnaire
            question={questions[currentStep]}
            answerInputText={this.state.currentAnswer}
            style={styles.questionnairePanel}
            onAnswerEnter={this.onAnswerEnter}
            placeholder={placeholders[currentStep]}
          />
        </View>
        <FooterPanel
          style={styles.footerPanel}
          btnTitle={'Next'}
          btnHandler={() => this.moveToNextStep()}
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  contentWrapper: {
    flex: 0.8,
    justifyContent: 'center',
    padding: 60,
    backgroundColor: '#fff'
  },
  questionnairePanel: {
    flex: 0.6
  },
  footerPanel: {
    flex: 0.2,
    justifyContent: 'flex-end'
  },
  backBtn: {
    paddingLeft: 0,
    marginBottom: 60,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  }
});

const mapStateToProps = ({ report }) => {
  const { reports, error, loading, created } = report;
  return { reports, error, loading, created };
};

export default connect(
  mapStateToProps,
  { createReport }
)(CreateReport);
