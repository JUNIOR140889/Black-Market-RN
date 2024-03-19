import React from "react";
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const TabMenuIcon = ({ color = '#0000', strokeWidth = 2, ...props }: SvgProps) => {
  return (
    <Svg
      width="19"
      height="12"
      {...props}
    >
      <Path
        d="M1.5 11.625a.728.728 0 01-.75-.75c0-.2.071-.375.213-.525a.706.706 0 01.537-.225h16a.71.71 0 01.538.225c.141.15.212.325.212.525 0 .217-.07.396-.212.538a.731.731 0 01-.538.212h-16zm0-4.875A.726.726 0 01.75 6a.728.728 0 01.75-.75h16c.217 0 .396.07.538.212A.731.731 0 0118.25 6a.728.728 0 01-.75.75h-16zm0-4.875a.706.706 0 01-.537-.225.74.74 0 01-.213-.525.726.726 0 01.75-.75h16a.728.728 0 01.75.75c0 .2-.07.375-.212.525a.71.71 0 01-.538.225h-16z"
      ></Path>
    </Svg>
  );
}

export default TabMenuIcon;
