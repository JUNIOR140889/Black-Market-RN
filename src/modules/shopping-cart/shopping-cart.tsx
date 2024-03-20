import { styled } from 'nativewind';
import React from 'react';
import { Image as RNImage } from 'react-native';

import images from '../../ui/assets/images/index';
import { Text } from '../../ui/core/text';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from '../../ui/core/view';

const Image = styled(RNImage);

interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
  onRemove: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  name,
  price,
  state,
  quantity,
  onRemove,
  onIncrement,
  onDecrement,
}) => (
  <View className="m-4 flex-row items-center justify-between">
    <View className="rounded-md">
      <Image
        className="h-28 w-28"
        source={require('../../ui/assets/images/product-details/image-5.png')}
      />
    </View>
    <View className="w-8/12 justify-between h-28 bg-purple-400">
      <View className="mx-4 flex-row justify-between">
        <Text className="font-bold">{name}</Text>
        <Text className="font-bold">${price}</Text>
      </View>
      <View>
        <Text className={`${}`}>Restored</Text>
      </View>
      <View className="flex-row">
        <TouchableOpacity className="ml-4" onPress={onRemove}>
          <Text className="text-blue-500">Remove</Text>
        </TouchableOpacity>
        <View className="flex-row items-center">
          <TouchableOpacity className="bg-red-500 rounded-full p-1" onPress={onDecrement}>
            <Text className="text-white font-bold">-</Text>
          </TouchableOpacity>
          <Text className="mx-2">{quantity}</Text>
          <TouchableOpacity className="bg-green-500 rounded-full p-1" onPress={onIncrement}>
            <Text className="text-white font-bold">+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

export const ShoppingCartScreen: React.FC = () => {
  const cartItems = [
    { name: 'Baumler chair', state: "New", price: 36, quantity: 12 },
    { name: 'Baumler chair', state: "New", price: 36, quantity: 1 },
    { name: 'Baumler chair', state: "New", price: 36, quantity: 1 },
  ];

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <SafeAreaView className="flex-1 bg-background-screen">
      <ScrollView className="w-full">
        <Image className="w-full" source={images.blackMarketHeader()} />

        <View className="flex-row justify-between mb-4 p-4 items-center">
          <Text variant="body1" className="text-lg">My shopping cart</Text>
          <TouchableOpacity>
            <Text variant="body1" className="text-link-100 font-bold text-sm">Clear all</Text>
          </TouchableOpacity>
        </View>
        <View className="border-black border mx-4 rounded-md">
          {cartItems.map((item, index) => (
            <>
              <CartItem
                key={index}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onRemove={() => console.log(`Removing ${item.name}`)}
                onIncrement={() => console.log(`Incrementing ${item.name}`)}
                onDecrement={() => console.log(`Decrementing ${item.name}`)}
              />
              <View className="h-px w-full bg-black" />
            </>
          ))}
        </View>
        <View className="flex-row justify-between mt-4">
          <Text className="text-xl font-bold">TOTAL</Text>
          <Text className="text-xl font-bold">${totalPrice}</Text>
        </View>
        <TouchableOpacity className="bg-blue-500 p-4 rounded-lg mt-4">
          <Text className="text-white font-bold text-center">Go to checkout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
