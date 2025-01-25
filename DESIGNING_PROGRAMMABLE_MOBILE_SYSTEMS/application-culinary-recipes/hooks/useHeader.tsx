import { useState, useCallback } from 'react';

const useHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpenBurger, setIsOpenBurger] = useState(false);

  const handleBurgerToggle = () => setIsOpenBurger(!isOpenBurger);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleScroll = useCallback((event: any) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    setIsScrolled(contentOffsetY > 50);
  }, []);

  return { isScrolled, isOpenBurger, handleBurgerToggle, handleScroll };
};

export default useHeader;
