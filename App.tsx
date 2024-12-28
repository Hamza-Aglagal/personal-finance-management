import React from 'react';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigators/TabNavigator';

export default function App() {
  return (
    <AlertNotificationRoot>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </AlertNotificationRoot>
  );
}