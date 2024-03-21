import { useQuery } from '@tanstack/react-query';

import { client } from '../common';
import { parseAxiosError } from '../common/utils';

export type Category = {
  id: number;
  name: string;
  description: string;
};

export type Product = {
  id: number;
  title: string;
  state: string;
  stock: number;
  unitPrice: string;
  pictures: string[];
  category: Category;
  subcategories: Category[];
};

export type Pagination = {
  first_url: string;
  prev_url: string;
  page_url: string;
  next_url: string;
  last_url: string;
  count: number;
  page: number;
  items: number;
};

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
