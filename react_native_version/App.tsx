/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  SafeAreaView, Text,
} from 'react-native';
import Login from './components/Login';
import PasswordsScreen from './components/PasswordsScreen';
import { UserContextProvider } from './context/UserContext';
import Register from './components/Register';

const Stack = createNativeStackNavigator()


function App(): React.JSX.Element {

  return (
   
    <UserContextProvider>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
        <Stack.Screen name='Register' component={Register} options={{headerShown:false}}/>
        <Stack.Screen name='PasswordScreen' component={PasswordsScreen} 
        options={{
          headerShown: false, 
          gestureEnabled: false, // Disable swipe back gesture
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </UserContextProvider>
 
  );
}


export default App;
