import React from 'react';
import { IIcon } from '.';
import Svg, { Path, Rect } from 'react-native-svg';

const InstagramIcon: React.FC<IIcon> = ({ color = '#000000', className }) => {
  return (
    <Svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Rect width="20" height="20" fill="white" fillOpacity="0.01" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.1673 5.83325C19.1673 3.07183 16.9287 0.833252 14.1673 0.833252H5.83398C3.07256 0.833252 0.833984 3.07183 0.833984 5.83325V14.1666C0.833984 16.928 3.07256 19.1666 5.83398 19.1666H14.1673C16.9287 19.1666 19.1673 16.928 19.1673 14.1666V5.83325ZM5.83398 2.49992H14.1673C16.0083 2.49992 17.5007 3.9923 17.5007 5.83325V14.1666C17.5007 16.0075 16.0083 17.4999 14.1673 17.4999H5.83398C3.99304 17.4999 2.50065 16.0075 2.50065 14.1666V5.83325C2.50065 3.9923 3.99304 2.49992 5.83398 2.49992ZM14.1583 9.35259C13.8891 7.53699 12.4635 6.11141 10.6479 5.84218C8.8698 5.57851 7.12306 6.48486 6.3149 8.09048C5.50674 9.69611 5.81938 11.639 7.09043 12.9101C8.36149 14.1811 10.3044 14.4937 11.91 13.6856C13.5156 12.8774 14.422 11.1307 14.1583 9.35259ZM7.80363 8.83982C8.28853 7.87644 9.33657 7.33263 10.4034 7.49083C11.4928 7.65237 12.3481 8.50772 12.5097 9.59708C12.6679 10.6639 12.1241 11.712 11.1607 12.1969C10.1973 12.6818 9.03158 12.4942 8.26895 11.7316C7.50632 10.9689 7.31874 9.80319 7.80363 8.83982ZM15.1732 6.00584C14.8478 6.33128 14.3202 6.33128 13.9947 6.00584C13.6693 5.6804 13.6693 5.15277 13.9947 4.82733C14.3202 4.50189 14.8478 4.50189 15.1732 4.82733C15.4987 5.15277 15.4987 5.6804 15.1732 6.00584Z"
        fill={color}
      />
    </Svg>
  );
};

export default InstagramIcon;
