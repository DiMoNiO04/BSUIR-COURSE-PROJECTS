/* eslint-disable @typescript-eslint/no-explicit-any */
import { EMethods } from '@/utils';
import { IErrorResponse } from './interfaces';

const apiRequest = async (url: string, method: EMethods, body?: Record<string, any>, token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData: IErrorResponse = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};

export default apiRequest;
