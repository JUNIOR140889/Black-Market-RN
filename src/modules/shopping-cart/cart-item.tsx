import { styled } from 'nativewind';
import React from 'react';
import { Image as RNImage } from 'react-native';

import { common } from '../../translations/en.json';
import { Text } from '../../ui/core/text';
import { TouchableOpacity, View } from '../../ui/core/view';

const Image = styled(RNImage);

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  state: string;
  onRemove: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  state,
  quantity,
  onRemove,
  onIncrement,
  onDecrement,
}) => (
  <View className="m-4 h-32 flex-row items-center justify-between">
    <Image
      className="h-24 w-24 rounded-md"
      source={require('../../ui/assets/images/shopping-cart/image-2.png')}
    />
    <View className="h-28 w-9/12 justify-between pl-2">
      <View className="mx-2 mt-1 flex-row justify-between">
        <Text variant="body1" className="font-bold">
          {name}
        </Text>
        <Text variant="body1" className="font-bold">
          ${price}
        </Text>
      </View>
      <View
        className={`${state === 'New' ? 'bg-tags-new' : 'bg-tags-restored'} mb-4 ml-2 w-20 items-center rounded-md`}>
        <Text variant="body2" className="text-white">
          {state}
        </Text>
      </View>
      <View className="flex-row items-center justify-between px-2">
        <TouchableOpacity className="" onPress={onRemove}>
          <Text variant="body2-bold" className="text-link-100">
            {common.buttons.remove}
          </Text>
        </TouchableOpacity>
        <View className="flex-row items-center">
          <TouchableOpacity className=" rounded-full p-0.5" onPress={onDecrement}>
            <Text variant="h6" className="pb-1 font-bold text-black">
              {common.labels.minusSign}
            </Text>
          </TouchableOpacity>
          <Text variant="body1" className="mx-2">
            {quantity}
          </Text>
          <TouchableOpacity className="rounded-full p-1" onPress={onIncrement}>
            <Text variant="h6" className="pb-1 font-bold text-black">
              {common.labels.plusSign}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);