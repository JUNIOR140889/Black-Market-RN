import type { UseMutationOptions } from '@tanstack/react-query';
import {
  type GetNextPageParamFunction,
  type GetPreviousPageParamFunction,
  useMutation,
} from '@tanstack/react-query';

import type { PaginateQuery } from '../types';

type KeyParams = {
  [key: string]: any;
};
export const DEFAULT_LIMIT = 10;

export function getQueryKey<T extends KeyParams>(key: string, params?: T) {
  return [key, ...(params ? [params] : [])];
}

export const useBaseMutation = <TVariables, TData>(
  props: UseMutationOptions<TData, string, TVariables, any>,
) => useMutation(props);

// for infinite query pages  to flatList data
export function normalizePages<T>(pages?: PaginateQuery<T>[]): T[] {
  return pages ? pages.reduce((prev: T[], current) => [...prev, ...current.results], []) : [];
}

// a function that accept a url and return params as an object
export function getUrlParameters(url: string | null): { [k: string]: string } | null {
  if (url === null) {
    return null;
  }
  let regex = /[?&]([^=#]+)=([^&#]*)/g,
    params = {},
    match;
  while ((match = regex.exec(url))) {
    if (match[1] !== null) {
      //@ts-ignore
      params[match[1]] = match[2];
    }
  }
  return params;
}

export const getPreviousPageParam: GetNextPageParamFunction<PaginateQuery<unknown>> = page =>
  getUrlParameters(page.previous)?.offset ?? null;

export const getNextPageParam: GetPreviousPageParamFunction<PaginateQuery<unknown>> = page =>
  getUrlParameters(page.next)?.offset ?? null;

const DEFAULT_ERROR_MESSAGE = 'something went wrong';

const parseError = (data: any) => {
  // TODO: refactor this and include types
  const { error, errors } = data || {};

  if (error) return error;

  if (errors) {
    const { fullMessages, base } = errors;

    if (fullMessages) {
      const [firstMessage] = fullMessages;
      return firstMessage;
    } else if (base) {
      const [firstMessage] = base;
      return firstMessage;
    } else if (Array.isArray(errors)) {
      const [firstMessage] = errors;
      return firstMessage;
    } else {
      const errorKey = Object.keys(errors)[0];
      const error = errors[errorKey][0];
      return `${errorKey} ${error}`;
    }
  }

  return DEFAULT_ERROR_MESSAGE;
};

export const parseAxiosError = (error: any) => {
  if (error) {
    const { response } = error;

    if (!response) {
      return DEFAULT_ERROR_MESSAGE;
    }

    if (response.status === 500) {
      return DEFAULT_ERROR_MESSAGE;
    } else {
      return parseError(response?.data);
    }
  }

  return DEFAULT_ERROR_MESSAGE;
};
