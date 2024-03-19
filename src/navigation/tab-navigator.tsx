/* eslint-disable react/no-unstable-nested-components */
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import clsx from 'clsx';
import type { ComponentType } from 'react';
import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import { StyleSheet } from 'react-native';
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
  Menu: undefined;
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
  Promotion: props => <SvgIcon name="tabSellIcon" {...props} />,
  Cart: props => <SvgIcon name="tabCartIcon" {...props} />,
  Favorite: props => <SvgIcon name="tabFavoriteIcon" {...props} />,
  Menu: props => <SvgIcon name="tabMenuIcon" {...props} />,
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
  {
    name: 'Menu',
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
  const fillColor = focused ? '#01031a' : '#ffffff';

  return (
    <View style={[styles.tabIconContainer, focused && styles.tabIconContainerFocused]}>
      <View style={styles.tabIconWrapper}>
        <TabIcon color={focused ? '#01031a' : '#ffffff'} {...props} fill={fillColor} />
      </View>
    </View>
  );
};

const TabBarLabel = ({ name, focused }: TabBarLabelType) => {
  const label = '';

  return <Text className={clsx(focused ? 'text-primary-50' : 'text-neutral-800')}>{label}</Text>;
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused }) => <TabBarLabel name={route.name} focused={focused} />,
        tabBarIcon: ({ focused, color }) => (
          <TabBarIcon name={route.name} color={color} focused={focused} />
        ),
      })}>
      <Tab.Group
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: '#01031a',
            height: 110,
          },
        }}>
        {tabs.map(({ name, component }) => (
          <Tab.Screen key={name} name={name} component={component} />
        ))}
      </Tab.Group>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 20,
    paddingBottom: 10,
  },
  tab: {
    paddingTop: 5,
    height: 200,
  },
  indicator: {
    backgroundColor: 'tomato',
    height: 4,
    borderRadius: 2,
  },
  tabIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    tintColor: 'white',
  },
  tabIconContainerFocused: {
    borderRadius: 50,
    backgroundColor: 'white',
  },
  tabIconWrapper: {
    padding: 8,
  },
});
