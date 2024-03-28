import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { PaymentScreen } from '../modules/payment/screens/payment-screen';
import { DetailsScreen } from '../modules/products/screens/detail-products/details-screen';
import { TabNavigator } from './tab-navigator';

export type MainStackParamList = {
  Tab: undefined;
  Details: undefined;
  Payment: undefined;
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
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
