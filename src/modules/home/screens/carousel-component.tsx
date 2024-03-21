import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { View } from '../../../ui/core/view';
import { Text } from '../../../ui/core/text';
import { Image } from '../../../ui/core/nativewind/image';
import TabFavoriteIcon from '../../../ui/assets/svgs/tab-favorite-icon';

const { width: screenWidth } = Dimensions.get('window');

interface Product {
  id: number;
  name: string;
  price: number;
  state: string;
  liked: boolean;
  image: any;
}

type RootStackParamList = {
  Details: { productId: number };
};

type CarouselNavigationProp = StackNavigationProp<RootStackParamList>;

const products: Product[] = [
  {
    id: 1,
    name: 'Baumler',
    price: 36,
    state: 'Restored',
    liked: false,
    image: {
      uri: 'https://www.ikea.com/us/en/images/products/stefan-chair-brown-black__0727320_pe735593_s5.jpg?f=s',
    },
  },
  {
    id: 2,
    name: 'Computer',
    price: 36,
    state: 'New',
    liked: true,
    image: {
      uri: 'https://www.ikea.com/us/en/images/products/stefan-chair-brown-black__0727320_pe735593_s5.jpg?f=s',
    },
  },
  {
    id: 3,
    name: 'Computer',
    price: 36,
    state: 'New',
    liked: true,
    image: {
      uri: 'https://www.ikea.com/us/en/images/products/stefan-chair-brown-black__0727320_pe735593_s5.jpg?f=s',
    },
  },
  {
    id: 4,
    name: 'Computer',
    price: 36,
    state: 'New',
    liked: true,
    image: {
      uri: 'https://www.ikea.com/us/en/images/products/stefan-chair-brown-black__0727320_pe735593_s5.jpg?f=s',
    },
  },
];

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
  const navigation = useNavigation<CarouselNavigationProp>();

  const navigateToDetails = () => {
    navigation.navigate('Details');
  };
  const renderItem = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigateToDetails();
        }}>
        <View className="mx-3 my-6 rounded-lg bg-white pb-3 shadow-md shadow-gray-400">
          <View className="items-center">
            <Image source={item.image} className="m-2 h-32 w-32 rounded-md object-cover" />
          </View>
          <View className="h-px justify-center bg-gray-400 shadow-lg " />
          <View className="border-t-1 flex-row items-center justify-between border-t border-black border-opacity-100 px-3 pt-3">
            <Text variant="h6-bold">${item.price}</Text>
            <View
              className={`${item.state === 'New' ? 'bg-tags-new' : 'bg-tags-restored'} flex items-center justify-center rounded-md p-1 px-2`}>
              <Text className="text-white" variant="h6">
                {item.state}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between pl-3 pr-1.5 pt-2">
            <Text variant="h6-bold">{item.name}</Text>
            <Icon focused={item.liked} />
          </View>
        </View>
      </TouchableOpacity>
  )};

  return (
    <View className="bg-background-screen pt-4">
      <Carousel
        data={products}
        layout={'default'}
        renderItem={renderItem}
        sliderWidth={screenWidth * 2.3}
        itemWidth={screenWidth * 0.5}
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
