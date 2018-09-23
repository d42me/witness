import React, { Component } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Heading, Text, Screen, View } from '@shoutem/ui';
import { Actions as NavigationActions } from 'react-native-router-flux';
// import { FooterPanel } from '../../components';
import { retrieveAndDecryptData } from '../../actions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: null
    };
  }

  componentWillMount() {}

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
    this.props.retrieveAndDecryptData();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);

    if (
      (nextProps.reports != null) &
      (this.state.reports !== nextProps.reports)
    ) {
      this.setState({
        reports: nextProps.reports
      });
    }
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

  renderReportCards(reports) {
    if (reports != null) {
      // Axios logic
    }
  }

  render() {
    const { reports } = this.state;
    return (
      <Screen style={{ flex: 1 }}>{this.renderReportCards(reports)}</Screen>
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

const mapStateToProps = ({ report }) => {
  const { reports, error, loading, created } = report;
  return { reports, error, loading, created };
};

export default connect(
  mapStateToProps,
  { retrieveAndDecryptData }
)(Home);
