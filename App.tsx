/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';

import AppNav from './src/navigation/AppNav';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import SplashScreen from 'react-native-splash-screen';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNav />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
