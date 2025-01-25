import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { IApiResponse, IApiResponseReturn, OPTIONS, fetcher } from '..';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_KEY } from '@/utils';

const tokenFetcher = <T>(url: string, token?: string) => fetcher<IApiResponse<T>>(url, token);

function useFetchDataToken<T>(endpoint: string): IApiResponseReturn<T> {
  const [token, setToken] = useState<string | null>(null);

  const { data, error } = useSWR(
    token ? [endpoint, token] : null,
    ([url, token]: [string, string]) => tokenFetcher<T>(url, token),
    OPTIONS
  );

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
      setToken(storedToken);
    };

    getToken();
  }, []);

  return {
    data: data?.data || null,
    code: data?.code || null,
    message: data?.message || null,
    isLoading: !error && !data && token !== null,
    isError: !!error,
  };
}

export default useFetchDataToken;
