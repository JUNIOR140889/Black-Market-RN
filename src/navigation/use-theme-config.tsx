import type { Theme } from '@react-navigation/native';
import { DefaultTheme } from '@react-navigation/native';

import { colors } from '@/ui/theme';

const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary[500],
    background: colors.white,
  },
};

export function useThemeConfig() {
  return LightTheme;
}
