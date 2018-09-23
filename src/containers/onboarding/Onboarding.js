import React, { Component } from 'react';
import { BackHandler, StyleSheet, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Heading, Text, Screen, View } from '@shoutem/ui';
import { Actions as NavigationActions } from 'react-native-router-flux';
import { FooterPanel } from '../../components';
// import { fetchMembers, fetchGroups, fetchUserGroups } from '../../actions';

class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      this.backAndroid()
    );
  }

  backAndroid() {
    return true;
  }

  presentCreateReport() {
    NavigationActions.createReport();
  }

  presentHome() {
    AsyncStorage.setItem('@hasSeenIntro40', JSON.stringify(true)).then(() =>
      NavigationActions.home()
    );
  }

  render() {
    return (
      <Screen style={{ flex: 1 }}>
        <View style={styles.contentWrapper}>
          <Heading>I am Witness. </Heading>
          <Text>
            I can create a private record of any type of attack or harassment.
            Your memory will be recorded permanently on the EOS Blockchain. Only
            you can access these records - it's your choice if and when you come
            forward.
          </Text>
        </View>
        <FooterPanel
          style={styles.footerPanel}
          btnTitle={"I'm ready"}
          btnHandler={() => this.presentHome()}
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
  footerPanel: {
    flex: 0.2,
    justifyContent: 'flex-end'
  }
});

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  {}
)(Onboarding);
