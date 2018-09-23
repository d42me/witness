import React from 'react';
import { Scene, Router, ActionConst, Stack } from 'react-native-router-flux';

import Home from './containers/home/Home';
import Onboarding from './containers/onboarding/Onboarding';
import CreateReport from './containers/createReport/CreateReport';
// import requireAuth from './containers/auth/requireAuth';
// import requireNotAuth from './containers/auth/requireNotAuth';

const RouterComponent = isInitialStart => {
  return (
    <Router showNavigationBar={false} style={styles.routerStyle}>
      <Stack hideNavBar>
        <Stack hideNavBar key="start">
          {isInitialStart ? (
            <Scene key="intro" component={Onboarding} hideNavBar />
          ) : (
            <Scene key="home" component={Home} hideNavBar />
          )}
        </Stack>
        <Stack key="main" type={ActionConst.RESET} hideNavBar>
          <Scene key="home" component={Home} hideNavBar />
          <Scene key="createReport" component={CreateReport} hideNavBar />
        </Stack>
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
