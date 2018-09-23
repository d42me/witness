import React from 'react';
import { Scene, Router, ActionConst, Stack } from 'react-native-router-flux';

import Onboarding from './containers/onboarding/Onboarding';
import CreateReport from './containers/createReport/CreateReport';
// import requireAuth from './containers/auth/requireAuth';
// import requireNotAuth from './containers/auth/requireNotAuth';

const RouterComponent = () => {
  return (
    <Router showNavigationBar={false} style={styles.routerStyle}>
      <Stack key="main" type={ActionConst.RESET} hideNavBar>
        <Scene key="intro" component={Onboarding} hideNavBar />
        <Scene key="createReport" component={CreateReport} hideNavBar />
      </Stack>
    </Router>
  );
};

const styles = {
  routerStyle: {
    flex: 1
  }
};

export default RouterComponent;
