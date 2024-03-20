import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import React, { useState } from 'react';
import { Image as RNImage, TouchableOpacity as RNTouchableOpacity } from 'react-native';

import { common } from '../../../../translations/en.json';
import DropdownComponent from '../../../../ui/core/select-menu';
import { Text } from '../../../../ui/core/text';
import { SafeAreaView, ScrollView, View } from '../../../../ui/core/view';
import { Button } from '../../../../ui/core/nativewind/button';
const Image = styled(RNImage);
const TouchableOpacity = styled(RNTouchableOpacity);

const item = {
  state: 'Restored',
  name: 'Baumler Chair',
  manufactur: 'Woodstock Co.',
  price: 30,
  description1:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.\n',
  description2:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit etiam eu turpis molestie, dictum est a, mattis tellus.',
};
const availableItems = 12;

const images = [
  require('../../../../ui/assets/images/product-details/image-5.png'),
  require('../../../../ui/assets/images/product-details/image-6.png'),
  require('../../../../ui/assets/images/product-details/image-5.png'),
];

const pressed = () => {
  console.log('pressed')
};

export const DetailsScreen = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const navigation = useNavigation();

  const changePrincipalImage = (index: number) => {
    setSelectedImage(index);
  };

  const handleBackToHome = () => {
    navigation.navigate('Tab');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView>
        <View>
          <Image
            className="w-full"
            source={require('../../../../ui/assets/images/logo-black-market/Header.png')}
          />
        </View>
        <View className="px-4 py-3">
          <View className="flex-row justify-between">
            <View className="w-1/4 items-center justify-center rounded-md bg-[#559F21]">
              <Text variant="body1" className="text-white">
                {item.state}
              </Text>
            </View>
            <TouchableOpacity className="mr-4" onPress={handleBackToHome}>
              <Text className="text-2xl font-bold text-red-700">X</Text>
            </TouchableOpacity>
          </View>
          <Text variant="h3">{item.name}</Text>
          <Text variant="h3" className="font-light">
            {common.details_screen.byManufacturer} {item.manufactur}
          </Text>
          <Text variant="h3" className="font-medium">
            {common.labels.dolarSign} {item.price}
          </Text>
          <Image source={images[selectedImage]} className="my-4 h-[300px] w-full rounded-lg" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            {images.map((image, index) => (
              <TouchableOpacity key={index} onPress={() => changePrincipalImage(index)}>
                <Image source={image} className="w-28 h-28 mr-4 rounded-md" />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View className="mb-4 flex-row items-center justify-between">
            <View className="items-center">
              <Text variant="body1" className="mb-3 mr-2 font-bold">
                {common.details_screen.quantity}
              </Text>
              <DropdownComponent quantity={availableItems} />
            </View>
            <View className="w-2/3 items-center">
              <Text variant="body1" className=" mr-2 font-bold">
                {common.details_screen.availability} {availableItems} {common.details_screen.items}
              </Text>
              <Button
                className="h-12 mt-3"
                label={common.labels.buy}
                variant="primary"
                textClassName="font-bold text-base"
                onPress={pressed}
              />
            </View>
          </View>
          <View className="mb-4">
            <Text variant="body1" className="mb-3 mr-2 font-bold">
              {common.details_screen.productDescription}
            </Text>
            <Text variant="body1">{item.description1}</Text>
            <Text variant="body1">{item.description2}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};