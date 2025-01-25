import React from 'react';
import { Svg, Rect, Path } from 'react-native-svg';
import IIcon from './interface';

const TrendingUpIcon: React.FC<IIcon> = ({ color }) => {
  return (
    <Svg width="21" height="20" viewBox="0 0 21 20" fill="none">
      <Rect width="20" height="20" fill="white" fillOpacity="0.01" />
      <Path
        d="M19.1673 5L11.2507 12.9167L7.08398 8.75L0.833984 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M14.166 5H19.166V10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

export default TrendingUpIcon;
