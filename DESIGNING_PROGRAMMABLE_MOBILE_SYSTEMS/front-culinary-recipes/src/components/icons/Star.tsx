import React from 'react';
import { IIcon } from '.';

const StarIcon: React.FC<IIcon> = ({ color = '#FF642F' }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="16" height="16" fill="white" fillOpacity="0.01" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.49723 4.89766L7.40227 1.03827C7.64683 0.542826 8.35332 0.542826 8.59788 1.03827L10.5029 4.89766L14.7632 5.52036C15.3098 5.60026 15.5276 6.27215 15.1319 6.65759L12.0498 9.6596L12.7771 13.9007C12.8706 14.4453 12.2989 14.8606 11.8098 14.6034L8.00007 12.5999L4.19038 14.6034C3.70129 14.8606 3.12959 14.4453 3.223 13.9007L3.95039 9.6596L0.868253 6.65759C0.472524 6.27215 0.690379 5.60026 1.23699 5.52036L5.49723 4.89766Z"
        fill={color}
      />
    </svg>
  );
};

export default StarIcon;
