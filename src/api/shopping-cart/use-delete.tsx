import type { UseMutationOptions } from '@tanstack/react-query';

import { client } from '../common';
import { parseAxiosError, useBaseMutation } from '../common/utils';

type DeleteVariables = {
  itemId: number;
};

export const deleteShoppingCartItem = async ({ itemId }: DeleteVariables): Promise<Response> => {
  try {
    const { data } = await client.delete(`/shopping_cart/line_items/${itemId}`);
    return data;
  } catch (error) {
    throw parseAxiosError(error);
  }
};

export const useDeleteShoppingCartItem = (
  props?: UseMutationOptions<Response, string, DeleteVariables, any>,
) =>
  useBaseMutation<DeleteVariables, Response>({
    mutationKey: ['deleteShoppingCartItem'],
    mutationFn: deleteShoppingCartItem,
    ...props,
  });
