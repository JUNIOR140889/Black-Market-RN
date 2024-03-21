import type { UseMutationOptions } from '@tanstack/react-query';

import { client } from '../common';
import { parseAxiosError, useBaseMutation } from '../common/utils';
import type { CartItem } from '../types';

type UpdateVariables = {
  itemId: number;
  quantity: number;
};

type UpdateResponse = {
  data: CartItem;
};

export const updateShoppingCartItem = async ({
  itemId,
  quantity,
}: UpdateVariables): Promise<UpdateResponse> => {
  try {
    const { data } = await client.patch(`/shopping_cart/line_items/${itemId}`, {
      line_item: {
        quantity: quantity,
      },
    });

    return data;
  } catch (error) {
    throw parseAxiosError(error);
  }
};

export const useUpdateShoppingCartItem = (
  props?: UseMutationOptions<UpdateResponse, string, UpdateVariables, any>,
) =>
  useBaseMutation<UpdateVariables, UpdateResponse>({
    mutationKey: ['updateShoppingCartItem'],
    mutationFn: updateShoppingCartItem,
    ...props,
  });
