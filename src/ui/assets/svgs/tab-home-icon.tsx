import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const TabHomeIcon = ({ color = '#000', strokeWidth = 2, ...props }: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M3.875 9.5L12.875 2.5L21.875 9.5V20.5C21.875 21.0304 21.6643 21.5391 21.2892 21.9142C20.9141 22.2893 20.4054 22.5 19.875 22.5H5.875C5.34457 22.5 4.83586 22.2893 4.46079 21.9142C4.08571 21.5391 3.875 21.0304 3.875 20.5V9.5Z"
      stroke={color}
      strokeWidth={strokeWidth}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M9.875 22.5V12.5H15.875V22.5"
      stroke={color}
      strokeWidth={strokeWidth}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
