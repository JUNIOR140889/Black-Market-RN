import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { LoginScreen } from '../modules/auth/screens/login-screen';
import { SignUpScreen } from '../modules/sign-up/screens/sign-up-screen';
import { MainNavigator } from './main-navigator';

export type AuthStackParamList = {
  Login: undefined;
  Welcome: undefined;
  SignUp: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Main" component={MainNavigator} />
    </Stack.Navigator>
  );
};
