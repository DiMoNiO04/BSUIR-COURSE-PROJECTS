/* eslint-disable @typescript-eslint/no-explicit-any */
import { EFetchErrors, EStatusCode } from '../utils';

export const fetcher = async <T>(url: string, token?: string, mockData?: T): Promise<T | null> => {
  if (!(url && !url.includes('undefined'))) return null;

  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      headers,
    });

    if (!response.ok) {
      const error = new Error(`${EFetchErrors.ERROR_HTTP}${response.status}`);
      (error as any).status = response.status;

      if (response.status === EStatusCode.NO_AUTH) {
        return Promise.reject({ status: EStatusCode.NO_AUTH });
      }

      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error(EFetchErrors.ERROR_FETCH, error);
    throw error;
  }
};
