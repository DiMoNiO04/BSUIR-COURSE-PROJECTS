import React from 'react';
import { Svg, Path } from 'react-native-svg';

const DeleteIcon: React.FC = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 6H5H21M6 6L5 21H19L18 6H6Z"
        stroke="#8B8D95"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 6V4C8 2.34315 9.34315 1 11 1H13C14.6569 1 16 2.34315 16 4V6"
        stroke="#8B8D95"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default DeleteIcon;
