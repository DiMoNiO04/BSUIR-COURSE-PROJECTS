import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_KEY, ROLE_KEY } from '@/utils';

const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const savedToken = await AsyncStorage.getItem(TOKEN_KEY);
        const savedRole = await AsyncStorage.getItem(ROLE_KEY);

        setToken(savedToken);
        setRole(savedRole);
      } catch (error) {
        console.error('Error retrieving auth data', error);
      }
    };

    fetchAuthData();
  }, []);

  return { token, role };
};

export default useAuthToken;
