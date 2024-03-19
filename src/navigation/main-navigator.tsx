import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { DetailsScreen } from '../modules/products/screens/detail-products/details-screen';
import { TabNavigator } from './tab-navigator';

export type MainStackParamList = {
  Tab: undefined;
  Details: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group>
        <Stack.Screen name="Tab" component={TabNavigator} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
