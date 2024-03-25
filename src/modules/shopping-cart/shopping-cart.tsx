import { useFocusEffect } from '@react-navigation/native';
import { styled } from 'nativewind';
import React, { useCallback } from 'react';
import { Image as RNImage } from 'react-native';

import { useGetShoppingCartItems } from '../../api/shopping-cart/use-shopping-cart';
import { common } from '../../translations/en.json';
import images from '../../ui/assets/images/index';
import { Button } from '../../ui/core/nativewind/button';
import { Text } from '../../ui/core/text';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from '../../ui/core/view';
import { CartItem } from './cart-item';

const Image = styled(RNImage);

export const ShoppingCartScreen: React.FC = () => {
  const buy = () => {
    console.log('buyed');
  };

  const { data, refetch } = useGetShoppingCartItems();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

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
          {data?.lineItems.map((item, index) => (
            <>
              <CartItem
                id={item.id}
                name={item.product.title}
                price={item.totalPriceInShoppingCart}
                state={item.product.state}
                quantity={item.quantity}
                image={item.product.pictures[0]}
                refetch={refetch}
              />
              {index < data.lineItems.length - 1 && <View className="h-px w-full bg-black" />}
            </>
          ))}
        </View>
        <View className="mt-4 flex-row items-center justify-between pr-16">
          <View className="w-3/5 flex-row items-center justify-evenly">
            <Text variant="body1-bold">{common.labels.total}</Text>
            <View className="h-px w-2/12 bg-black" />
            <Text variant="body1-bold">{data?.totalPrice}</Text>
          </View>
          <View className="pr-9">
            <Button onPress={buy} textClassName="font-bold text-base" label={common.buttons.buy} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
