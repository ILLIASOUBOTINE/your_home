/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import AppNav from './src/navigation/AppNav';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <AppNav />
    </NavigationContainer>
  );
}

export default App;
