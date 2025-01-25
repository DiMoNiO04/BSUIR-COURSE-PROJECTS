import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, usePathname } from 'expo-router';
import { SUCCESS_LOGOUT, TOKEN_KEY, EUrls, ROLE_KEY } from '@/utils';

const useLogout = () => {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      setIsAuth(!!token);
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove([TOKEN_KEY, ROLE_KEY]);

      setIsAuth(false);

      if (
        pathname === EUrls.PROFILE ||
        pathname === EUrls.PROFILE_FAVORITES ||
        pathname === EUrls.CREATE_RECIPE ||
        pathname === EUrls.UPDATE_RECIPE
      ) {
        router.push(EUrls.MAIN);
      }

      return SUCCESS_LOGOUT;
    } catch (error) {
      console.error('Error during logout:', error);
      return 'Logout failed. Please try again.';
    }
  };

  return { isAuth, handleLogout };
};

export default useLogout;
