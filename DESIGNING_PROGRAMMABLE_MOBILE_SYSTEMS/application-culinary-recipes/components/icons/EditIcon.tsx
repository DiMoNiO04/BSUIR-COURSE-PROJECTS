import React from 'react';
import { Svg, Path } from 'react-native-svg';

const EditIcon: React.FC = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 17.25V21H6.75L17.81 9.94L13.06 5.19L3 17.25Z"
        stroke="#8B8D95"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 4.5C21.55 4.5 22 4.95 22 5.5C22 6.05 21.55 6.5 21 6.5C20.45 6.5 20 6.05 20 5.5C20 4.95 20.45 4.5 21 4.5Z"
        stroke="#8B8D95"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default EditIcon;
