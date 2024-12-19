import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/Store';
import AppNavigator from './src/navigation/AppNavigator';

function App(): React.JSX.Element {

  return (
      <Provider store={store}>
      <AppNavigator />
  </Provider>
  );
}

export default App;

