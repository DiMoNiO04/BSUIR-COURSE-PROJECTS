import React from 'react';
import { IIcon } from '.';

const CloseIcon: React.FC<IIcon> = ({ color = '#000000', className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect opacity="0.01" width="24" height="24" fill="#D8D8D8" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.63582 4.22185C5.24529 3.83132 4.61213 3.83132 4.2216 4.22185C3.83108 4.61237 3.83108 5.24554 4.2216 5.63606L10.5856 12L4.2216 18.364C3.83108 18.7545 3.83108 19.3877 4.2216 19.7782C4.61213 20.1687 5.24529 20.1687 5.63582 19.7782L11.9998 13.4142L18.3637 19.7782C18.7543 20.1687 19.3874 20.1687 19.778 19.7782C20.1685 19.3877 20.1685 18.7545 19.778 18.364L13.414 12L19.778 5.63606C20.1685 5.24554 20.1685 4.61237 19.778 4.22185C19.3874 3.83132 18.7543 3.83132 18.3637 4.22185L11.9998 10.5858L5.63582 4.22185Z"
        fill={color}
      />
    </svg>
  );
};

export default CloseIcon;
