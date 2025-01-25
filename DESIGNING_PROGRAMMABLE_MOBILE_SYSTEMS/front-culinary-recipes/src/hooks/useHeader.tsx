import { useState, useEffect } from 'react';

const useHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpenBurger, setIsOpenBurger] = useState(false);

  const handleBurgerToggle = () => setIsOpenBurger(!isOpenBurger);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { isScrolled, isOpenBurger, handleBurgerToggle };
};

export default useHeader;
