import { styled } from 'nativewind';
import React from 'react';
import { Image as RNImage } from 'react-native';

import { common } from '../../translations/en.json';
import images from '../../ui/assets/images/index';
import { Text } from '../../ui/core/text';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from '../../ui/core/view';

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

const CartItem: React.FC<CartItemProps> = ({
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

export const ShoppingCartScreen: React.FC = () => {
  const cartItems = [
    { name: 'Baumler chair', state: 'New', price: 36, quantity: 12 },
    { name: 'Baumler chair', state: 'Restored', price: 36, quantity: 1 },
    { name: 'Baumler chair', state: 'New', price: 36, quantity: 1 },
  ];

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <SafeAreaView className="flex-1 bg-background-screen">
      <ScrollView className="w-full">
        <Image className="w-full" source={images.blackMarketHeader()} />

        <View className="flex-row items-center justify-between p-4">
          <Text variant="body1" className="text-lg">
            {common.labels.shoppingCart}
          </Text>
          <TouchableOpacity>
            <Text variant="body1" className="text-sm font-bold text-link-100">
              {common.buttons.clearAll}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mx-4 rounded-lg border border-black bg-white">
          {cartItems.map((item, index) => (
            <>
              <CartItem
                key={index}
                name={item.name}
                price={item.price}
                state={item.state}
                quantity={item.quantity}
                onRemove={() => console.log(`Removing ${item.name}`)}
                onIncrement={() => console.log(`Incrementing ${item.name}`)}
                onDecrement={() => console.log(`Decrementing ${item.name}`)}
              />
              {index < cartItems.length - 1 && <View className="h-px w-full bg-black" />}
            </>
          ))}
        </View>
        <View className="mt-4 flex-row items-center justify-between pr-4">
          <View className="w-3/5 flex-row items-center justify-evenly">
            <Text variant="body1-bold">{common.labels.total}</Text>
            <View className="h-px w-2/12 bg-black" />
            <Text variant="body1-bold">
              {common.labels.dolarSign}
              {totalPrice}
            </Text>
          </View>
          <TouchableOpacity className="rounded-lg bg-background-promotion p-3.5">
            <Text variant="body2-bold" className="text-center text-white">
              {common.buttons.checkout}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
