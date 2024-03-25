import { useQuery } from '@tanstack/react-query';

import { client } from '../common';
import { parseAxiosError } from '../common/utils';
import type { Pagination, Product } from '../types';

type Response = {
  data: Product[];
  pagination: Pagination;
};

export const getItems = async (): Promise<Response> => {
  try {
    const { data } = await client.get('/products');
    return data;
  } catch (error) {
    throw parseAxiosError(error);
  }
};

export const useGetItems = () =>
  useQuery({
    queryKey: ['getItems'],
    queryFn: () => getItems(),
    keepPreviousData: false,
  });
