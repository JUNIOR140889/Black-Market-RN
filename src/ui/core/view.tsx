import { styled } from 'nativewind';
import { View as RNView } from 'react-native';
import { ScrollView as RNScrollView } from 'react-native';
import { TouchableOpacity as RNTouchableOpacity } from 'react-native';
import { Pressable as RNPressable } from 'react-native';
import { SafeAreaView as NSafeAreaView } from 'react-native-safe-area-context';

export const View = styled(RNView);
export const SafeAreaView = styled(NSafeAreaView);
export const ScrollView = styled(RNScrollView);
export const TouchableOpacity = styled(RNTouchableOpacity);
export const Pressable = styled(RNPressable);
