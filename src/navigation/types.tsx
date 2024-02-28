import type { RouteProp as NRouteProp } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { AuthStackParamList } from './auth-navigator';
import type { MainStackParamList } from './main-navigator';

export type RootStackParamList = AuthStackParamList & MainStackParamList; //  & FooStackParamList & BarStackParamList
// very important to type check useNavigation hook
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RouteProp<T extends keyof RootStackParamList> = NRouteProp<RootStackParamList, T>;

export type AuthStackScreenProps<ScreenName extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, ScreenName>;

export type AuthStackRouteProp<T extends keyof AuthStackParamList> = NRouteProp<
  AuthStackParamList,
  T
>;

export type MainStackScreenProps<ScreenName extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, ScreenName>;
