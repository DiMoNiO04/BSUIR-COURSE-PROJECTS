import React from 'react';
import { useLocation } from 'react-router-dom';
import { MainHeader, SecondHeader } from '..';

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return <>{isHomePage ? <MainHeader /> : <SecondHeader />}</>;
};

export default Header;
