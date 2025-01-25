import React from 'react';
import { Svg, Path, Rect } from 'react-native-svg';

const FavoriteIcon: React.FC = () => {
  return (
    <Svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <Path
        d="M22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44Z"
        fill="#FF642F"
      />
      <Rect x="11" y="11" width="22" height="22" fill="white" fillOpacity="0.01" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.9999 14.9013L22.3233 14.5779C23.4408 13.4599 24.9567 12.8318 26.5374 12.8318C28.1182 12.8318 29.6341 13.4599 30.7513 14.5776C31.8693 15.6951 32.4975 17.2111 32.4975 18.7918C32.4975 20.3725 31.8693 21.8885 30.7515 23.0058L22.6481 31.1091C22.2901 31.4671 21.7097 31.4671 21.3518 31.1091L13.2484 23.0058C10.9211 20.6785 10.9211 16.9051 13.2484 14.5778C15.5758 12.2504 19.3491 12.2504 21.6765 14.5778L21.9999 14.9013Z"
        fill="white"
      />
    </Svg>
  );
};

export default FavoriteIcon;
