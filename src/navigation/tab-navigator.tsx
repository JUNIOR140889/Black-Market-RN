/* eslint-disable react/no-unstable-nested-components */
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import clsx from 'clsx';
import type { ComponentType } from 'react';
import * as React from 'react';
import type { SvgProps } from 'react-native-svg';

import { HomeScreen } from '../modules/home/screens/home-screen';
import colors from '../ui/theme/colors';
import { SvgIcon } from '../ui/core/icon';

import type { MainStackScreenProps } from './types';

import { Text, View } from "../ui/core"

type TabParamList = {
  Home: undefined;
  Promotion: undefined;
  Cart: undefined;
  Favorite: undefined;
};

type TabType = {
  name: keyof TabParamList;
  component: ComponentType<any>;
};

type TabIconsType = {
  [key in keyof TabParamList]: (props: SvgProps) => JSX.Element;
};

export type TabListProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  MainStackScreenProps<'Tab'>
>;

const Tab = createBottomTabNavigator<TabParamList>();

const tabsIcons: TabIconsType = {
  Home: props => <SvgIcon name="tabHomeIcon" {...props} />,
  Promotion: props => <SvgIcon name="tabHomeIcon" {...props} />,
  Cart: props => <SvgIcon name="tabHomeIcon" {...props} />,
  Favorite: props => <SvgIcon name="tabHomeIcon" {...props} />,
};

const tabs: TabType[] = [
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'Promotion',
    component: HomeScreen,
  },
  {
    name: 'Cart',
    component: HomeScreen,
  },
  {
    name: 'Favorite',
    component: HomeScreen,
  },
];

type TabBarIconType = {
  name: keyof TabParamList;
  color: string;
  focused: boolean;
};

type TabBarLabelType = {
  name: keyof TabParamList;
  focused: boolean;
};

const TabBarIcon = ({ color, name, focused, ...props }: TabBarIconType) => {
  const TabIcon = tabsIcons[name];

  return (
    <View
      className={clsx(
        'absolute flex w-full items-center border-t-2',
        focused ? 'border-primary-600' : 'border-transparent',
      )}>
      <View className="px-4 pt-2">
        <TabIcon color={color} {...props} />
      </View>
    </View>
  );
};

const TabBarLabel = ({ name, focused }: TabBarLabelType) => {
  const label = '';

  return (
    <Text className={clsx(focused ? 'text-primary-600' : 'text-neutral-800')}>
      {label}
    </Text>
  );
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused }) => <TabBarLabel name={route.name} focused={focused} />,
        tabBarIcon: ({ focused, color }) => (
          <TabBarIcon name={route.name} color={color} focused={focused} />
        ),
        tabBarActiveTintColor: colors.primary[600],
        tabBarInactiveTintColor: colors.neutral[800],
      })}>
      <Tab.Group
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            borderTopWidth: 0,
          },
        }}>
        {tabs.map(({ name, component }) => (
          <Tab.Screen key={name} name={name} component={component} />
        ))}
      </Tab.Group>
    </Tab.Navigator>
  );
};
