import React from "react";
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const TabFavoriteIcon = ({ color = '#0000', strokeWidth = 2, ...props }: SvgProps) => {
  return (
    <Svg
      width="19"
      height="16"
      {...props}
    >
      <Path
        d="M8.34 15.565l-1.35-1.281a61.27 61.27 0 01-4.512-4.605C1.16 8.173.5 6.558.5 4.834c0-1.37.454-2.518 1.362-3.445C2.77.463 3.895 0 5.237 0c.758 0 1.512.181 2.262.543.75.363 1.417.947 2.001 1.753.584-.806 1.252-1.39 2.002-1.753C12.252.181 13.005 0 13.763 0c1.342 0 2.467.463 3.375 1.39.908.926 1.362 2.074 1.362 3.444 0 1.74-.671 3.371-2.013 4.894a62.525 62.525 0 01-4.5 4.58l-1.326 1.233c-.332.306-.719.459-1.161.459-.442 0-.829-.145-1.16-.435z"
      ></Path>
    </Svg>
  );
}

export default TabFavoriteIcon;
