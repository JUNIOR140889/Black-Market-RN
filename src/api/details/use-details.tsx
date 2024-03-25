import { useQuery } from '@tanstack/react-query';

import { client } from '../common';
import { parseAxiosError } from '../common/utils';
import type { Product } from '../types';

export const getItemDetails = async (id: number): Promise<Product> => {
  try {
    const { data } = await client.get(`/products/${id}`);
    return data;
  } catch (error) {
    throw parseAxiosError(error);
  }
};

export const useGetItemDetails = (id: number) =>
  useQuery({
    queryKey: ['getItemDetails'],
    queryFn: () => getItemDetails(id),
    keepPreviousData: false,
  });
