import { styled } from 'nativewind';
import type { ComponentProps } from 'react';
import type { SvgProps } from 'react-native-svg';

import icons from '../assets/icons';
import svgs from '../assets/svgs';
import { Image } from './nativewind/image';

export type IconName = keyof typeof icons;
export type SvgName = keyof typeof svgs;

type BaseProps = {
  size?: number;
};

export type IconProps = BaseProps & {
  name: IconName;
} & ComponentProps<typeof Image>;

export type SvgIconProps = BaseProps & {
  name: SvgName;
} & SvgProps;

export const Icon = styled(({ size, style, name, ...props }: IconProps) => {
  const source = icons[name]();

  return (
    <Image
      source={source}
      style={[
        size
          ? {
              width: size,
              height: size,
            }
          : {},
        style,
      ]}
      contentFit="contain"
      {...props}
    />
  );
});

export const SvgIcon = styled(({ size, style, name, ...props }: SvgIconProps) => {
  const Svg = svgs[name]();

  return (
    <Svg
      style={[
        size
          ? {
              width: size,
              height: size,
            }
          : {},
        style,
      ]}
      {...props}
    />
  );
});
