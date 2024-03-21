import { styled } from 'nativewind';
import React from 'react';
import { Image as RNImage } from 'react-native';

import { useDeleteShoppingCartItem } from '../../api/shopping-cart/use-delete';
import { useUpdateShoppingCartItem } from '../../api/shopping-cart/use-update';
import { common } from '../../translations/en.json';
import { Text } from '../../ui/core/text';
import { TouchableOpacity, View } from '../../ui/core/view';

const Image = styled(RNImage);

interface CartItemProps {
  id: number;
  name: string;
  price: string;
  quantity: number;
  state: string;
  image: string;
  refetch: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  state,
  image,
  quantity,
  refetch,
}) => {
  const { mutate: mutateUpdate } = useUpdateShoppingCartItem();
  const { mutate: mutateDelete } = useDeleteShoppingCartItem();

  const handleUpdate = async (newQuantity: number) => {
    try {
      await mutateUpdate({ itemId: id, quantity: newQuantity });
    } catch (error) {}
    refetch();
  };

  const handleDelete = async () => {
    try {
      await mutateDelete({ itemId: id });
    } catch (error) {}
    refetch();
  };

  return (
    <View className="m-4 h-32 flex-row items-center justify-between">
      <Image className="h-24 w-24 rounded-md" source={{ uri: image }} />
      <View className="h-28 w-9/12 justify-between pl-2">
        <View className="mx-2 mt-1 flex-row justify-between">
          <Text variant="body1" className="font-bold">
            {name}
          </Text>
          <Text variant="body1" className="font-bold">
            {price}
          </Text>
        </View>
        <View
          className={`${state === 'totaly_new' ? 'bg-tags-new' : 'bg-tags-restored'} mb-4 ml-2 h-5 w-20 items-center rounded-md`}>
          <Text variant="body2" className="text-white">
            {`${state === 'totaly_new' ? 'New' : 'Restored'}`}
          </Text>
        </View>
        <View className="flex-row items-center justify-between px-2">
          <TouchableOpacity className="" onPress={handleDelete}>
            <Text variant="body2-bold" className="text-link-100">
              {common.buttons.remove}
            </Text>
          </TouchableOpacity>
          <View className="flex-row items-center">
            <TouchableOpacity
              className=" rounded-full p-0.5"
              onPress={() => {
                handleUpdate(quantity - 1);
              }}>
              <Text variant="h5" className="pb-1 font-bold text-black">
                {common.labels.minusSign}
              </Text>
            </TouchableOpacity>
            <Text variant="body1" className="mx-2">
              {quantity}
            </Text>
            <TouchableOpacity
              className="rounded-full p-1"
              onPress={() => {
                handleUpdate(quantity + 1);
              }}>
              <Text variant="h5" className="pb-1 font-bold text-black">
                {common.labels.plusSign}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
