import React, { Component } from 'react';
import { BackHandler, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Heading, Text, Screen, View } from '@shoutem/ui';
import { Actions as NavigationActions } from 'react-native-router-flux';
// import { FooterPanel } from '../../components';
import { retrieveAndDecryptData } from '../../actions';
import { ReportCard, FooterPanel } from '../../components';

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
    if (nextProps.reports != null && nextProps.reports !== this.state.reports) {
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

  createReport() {
    NavigationActions.createReport();
  }

  renderCard(report, i) {
    const reportParsed = report ? JSON.parse(report) : [];
    if (i === 0) {
      return <ReportCard report={reportParsed} key={i} isFirstCard />;
    }
    return <ReportCard report={reportParsed} key={i} />;
  }

  renderReportCards(reports) {
    const cards = [];
    let i = 0;
    if (reports != null) {
      reports.forEach(report => {
        const card = this.renderCard(report, i);
        cards.push(card);
        i++;
      });
    }
    return cards;
  }

  render() {
    const { reports } = this.state;
    return (
      <Screen style={{ flex: 1 }}>
        <Heading style={styles.heading}>Your reports:</Heading>
        <ScrollView style={styles.cardWrapper} horizontal>
          {this.renderReportCards(reports)}
        </ScrollView>
        <FooterPanel
          style={styles.footerPanel}
          btnTitle={'Create report'}
          btnHandler={() => this.createReport()}
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  heading: {
    paddingLeft: 40,
    marginTop: 100
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 60
  },
  cardWrapper: {
    flex: 0.8
  },
  footerPanel: {
    flex: 0.2,
    justifyContent: 'flex-end'
  },
  reportCardContentWrapper: {
    justifyContent: 'center'
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
