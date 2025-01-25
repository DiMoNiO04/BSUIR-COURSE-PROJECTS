import React from 'react';
import { Svg, Path, Rect } from 'react-native-svg';

const PasswordIcon: React.FC = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Rect width="24" height="24" fill="white" fillOpacity="0.01" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 10H5C3.34315 10 2 11.3431 2 13V20C2 21.6569 3.34315 23 5 23H19C20.6569 23 22 21.6569 22 20V13C22 11.3431 20.6569 10 19 10H18V7C18 3.68629 15.3137 1 12 1C8.68629 1 6 3.68629 6 7V10ZM8 10H16V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V10ZM17 12H19C19.5523 12 20 12.4477 20 13V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V13C4 12.4477 4.44772 12 5 12H7H17Z"
        fill="#7F7F7F"
      />
    </Svg>
  );
};

export default PasswordIcon;
