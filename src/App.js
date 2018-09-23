// import React, { Component } from 'react';
// import { Provider } from 'react-redux';
// import store from './configureStore';
// import { Spinner } from './components/common';
// import Router from './Router';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       hasLoaded: false,
//       isFirstLaunch: false
//     };
//   }

//   componentWillMount() {
//     this.setState({ hasLoaded: true });
//   }

//   componentDidMount() {}

//   componentWillUnmount() {}

//   render() {
//     return (
//       <Provider store={store}>
//         {this.state.hasLoaded ? (
//           <Router isLoggedIn={this.state.isLoggedIn} />
//         ) : (
//           <Spinner />
//         )}
//       </Provider>
//     );
//   }
// }

// export default App;
