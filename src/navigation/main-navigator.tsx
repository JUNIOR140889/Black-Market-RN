import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { TabNavigator } from './tab-navigator';

export type MainStackParamList = {
    Tab: undefined;
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
            </Stack.Group>
        </Stack.Navigator>
    );
};
