import React from 'react';
import { IIcon } from '.';

const ArrowDownIcon: React.FC<IIcon> = ({ color = '#000000', className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect opacity="0.01" width="16" height="16" fill="#D8D8D8" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.47206 5.52851C4.21171 5.26816 3.7896 5.26816 3.52925 5.52851C3.2689 5.78886 3.2689 6.21097 3.52925 6.47132L7.52925 10.4713C7.7896 10.7317 8.21171 10.7317 8.47206 10.4713L12.4721 6.47132C12.7324 6.21097 12.7324 5.78886 12.4721 5.52851C12.2117 5.26816 11.7896 5.26816 11.5292 5.52851L8.00065 9.05711L4.47206 5.52851Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowDownIcon;
