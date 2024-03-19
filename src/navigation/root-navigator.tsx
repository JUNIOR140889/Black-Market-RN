import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect } from 'react';

import { AuthNavigator } from './auth-navigator';
import { MainNavigator } from './main-navigator';
import { NavigationContainer } from './navigator-container';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export const Root = () => {

  const status = "signOut"

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'none',
      }}>
      {status === 'signOut' ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="App" component={MainNavigator} />
      )}
    </Stack.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <Root />
    </NavigationContainer>
    </QueryClientProvider>
  );
};
