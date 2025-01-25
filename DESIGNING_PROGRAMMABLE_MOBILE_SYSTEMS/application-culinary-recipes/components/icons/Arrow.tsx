import React from 'react';
import { Svg, Path } from 'react-native-svg';
import IIcon from './interface';

const ArrowIcon: React.FC<IIcon> = ({ color = '#000000', className }) => (
  <Svg className={className} width={20} height={20} viewBox="0 0 16 16" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.472 5.529a.75.75 0 0 0-1.06 1.06l4 4a.75.75 0 0 0 1.06 0l4-4a.75.75 0 0 0-1.06-1.06L8 9.057 4.472 5.529z"
      fill={color}
    />
  </Svg>
);

export default ArrowIcon;
