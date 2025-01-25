import useSWR from 'swr';
import { fetcher, IApiResponse, IApiResponseReturn, OPTIONS } from '..';
import { EFetchErrors } from '@/utils';

const useFetchData = <T>(endpoint: string): IApiResponseReturn<T> => {
  const { data, error } = useSWR<IApiResponse<T>>(endpoint, fetcher, OPTIONS);

  if (error) {
    console.error(`${EFetchErrors.ERROR_FETCH} ${endpoint}`, error);
  }

  return {
    data: data?.data || null,
    code: data?.code || null,
    message: data?.message || null,
    isLoading: !error && !data,
    isError: !!error,
  };
};

export default useFetchData;
