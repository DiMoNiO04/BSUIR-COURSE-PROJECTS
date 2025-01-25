import useSWR, { mutate } from 'swr';
import { useCookies } from 'react-cookie';
import { IApiResponse, IApiResponseReturn, OPTIONS, fetcher } from '..';
import { TOKEN_KEY } from '@/utils';

const tokenFetcher = <T>(url: string, token?: string) => fetcher<IApiResponse<T>>(url, token);

function useFetchDataToken<T>(endpoint: string): IApiResponseReturn<T> {
  const [cookies] = useCookies([TOKEN_KEY]);
  const token = cookies[TOKEN_KEY];

  const { data, error } = useSWR(
    token ? [endpoint, token] : null,
    ([url, token]: [string, string]) => tokenFetcher<T>(url, token),
    OPTIONS
  );

  return {
    data: data?.data || null,
    code: data?.code || null,
    message: data?.message || null,
    isLoading: !error && !data,
    isError: !!error,
  };
}

export default useFetchDataToken;
