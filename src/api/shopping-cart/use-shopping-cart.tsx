import { useQuery } from '@tanstack/react-query';

import { client } from '../common';
import { parseAxiosError } from '../common/utils';
import type { CartItem, Pagination } from '../types';

type Response = {
  id: number;
  totalPrice: string;
  lineItems: CartItem[];
  pagination: Pagination;
};

export const getShoppingCartItems = async (): Promise<Response> => {
  try {
    const { data } = await client.get('/shopping_cart');
    return data;
  } catch (error) {
    throw parseAxiosError(error);
  }
};

export const useGetShoppingCartItems = () =>
  useQuery({
    queryKey: ['getShoppingCartItems'],
    queryFn: () => getShoppingCartItems(),
    keepPreviousData: false,
  });
