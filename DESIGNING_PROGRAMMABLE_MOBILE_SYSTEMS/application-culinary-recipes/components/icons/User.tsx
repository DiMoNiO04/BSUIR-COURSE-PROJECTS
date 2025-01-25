import React from 'react';
import { Svg, Path, Rect } from 'react-native-svg';

const UserIcon: React.FC = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Rect width="24" height="24" fill="white" fillOpacity="0.01" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7C7 4.23858 9.23858 2 12 2ZM12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4ZM21 19V21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21V19C19 17.3431 17.6569 16 16 16H8C6.34315 16 5 17.3431 5 19V21C5 21.5523 4.55228 22 4 22C3.44772 22 3 21.5523 3 21V19C3 16.2386 5.23858 14 8 14H16C18.7614 14 21 16.2386 21 19Z"
        fill="#7F7F7F"
      />
    </Svg>
  );
};

export default UserIcon;