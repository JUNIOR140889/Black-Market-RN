import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import type { Product } from '../../../api/products/use-products';
import { useGetItems } from '../../../api/products/use-products';
import TabFavoriteIcon from '../../../ui/assets/svgs/tab-favorite-icon';
import { Image } from '../../../ui/core/nativewind/image';
import { Text } from '../../../ui/core/text';
import { View } from '../../../ui/core/view';

const { width: screenWidth } = Dimensions.get('window');

type IconType = {
  focused: boolean;
};

const Icon = ({ focused, ...props }: IconType) => {
  const fillColor = focused ? 'red' : 'none';
  return (
    <View className="p-2">
      <TabFavoriteIcon
        color={fillColor}
        stroke={`${focused ? 'red' : 'black'}`}
        strokeWidth="2%"
        fill={fillColor}
        {...props}
      />
    </View>
  );
};

const CarouselComponent: React.FC = () => {
  const { data, refetch } = useGetItems();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity>
        <View className="mx-3 my-6 h-64 rounded-lg bg-white pb-3 shadow-md shadow-gray-500">
          <View className="items-center">
            <Image source={item.pictures[0]} className="m-2 h-32 w-32 rounded-md object-cover" />
          </View>
          <View className="h-px bg-black shadow-lg shadow-gray-400 " />
          <View className="border-t-1 flex-row items-center justify-between border-t border-black px-3 pt-3 opacity-100">
            <Text variant="h6">{item.unitPrice}</Text>
            <View
              className={`${item.state === 'totaly_new' ? 'bg-tags-new' : 'bg-tags-restored'} flex items-center justify-center rounded-md p-1 px-2`}>
              <Text className="text-white" variant="body1">
                {`${item.state === 'totaly_new' ? 'New' : 'Restored'}`}
              </Text>
            </View>
          </View>
          <View className="h-16 flex-row items-center justify-between pl-3 pr-1.5 pt-2">
            <Text className="w-4/6" variant="h6">
              {item.title}
            </Text>
            <Icon focused={true} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (!data || !data.data) {
    return;
  }

  return (
    <View className="bg-background-screen pt-4">
      <Carousel
        data={data.data}
        layout={'default'}
        renderItem={renderItem}
        sliderWidth={screenWidth * 2}
        itemWidth={screenWidth * 0.5}
        firstItem={1}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        loop
      />
      <View className="items-center">
        <Text className="text-blue-600" variant="h6-bold">See all</Text>
      </View>
    </View>
  );
};

export default CarouselComponent;
