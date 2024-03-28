import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import React, { useCallback, useState } from 'react';
import { Image as RNImage, TouchableOpacity as RNTouchableOpacity } from 'react-native';

import { useAddShoppingCartItems } from '../../../../api/details/use-buy';
import { useGetItemDetails } from '../../../../api/details/use-details';
import { common } from '../../../../translations/en.json';
import { Button } from '../../../../ui/core/nativewind/button';
import DropdownComponent from '../../../../ui/core/select-menu';
import { Text } from '../../../../ui/core/text';
import { SafeAreaView, ScrollView, View } from '../../../../ui/core/view';

const Image = styled(RNImage);
const TouchableOpacity = styled(RNTouchableOpacity);
export interface DetailsScreenProps {
  route: {
    params: {
      id: number;
    };
  };
}

export const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const { id } = route.params;
  const { data, refetch } = useGetItemDetails(id);
  const mutate = useAddShoppingCartItems({});

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );
  const [selectedValue, setSelectedValue] = useState('1');
  const [selectedImage, setSelectedImage] = useState(0);
  const navigation = useNavigation();

  const handleDropdownChange = (value: string) => {
    setSelectedValue(value);
  };

  const buy = async (itemId: number, quantity: number) => {
    try {
      await mutate.mutateAsync({ itemId, quantity });
    } catch (error) {}
    navigation.navigate('Tab');
  };

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
            <View
              className={`${data?.state === 'totaly_new' ? 'bg-tags-new' : 'bg-tags-restored'} w-1/4 items-center justify-center rounded-md`}>
              <Text variant="body1-bold" className="text-white">
                {data?.state === 'totaly_new' ? 'New' : 'Restored'}
              </Text>
            </View>
            <TouchableOpacity className="mr-4" onPress={handleBackToHome}>
              <Text className="text-2xl font-bold text-red-700">X</Text>
            </TouchableOpacity>
          </View>
          <Text variant="h3" className="font-semi-bold">
            {data?.title}
          </Text>
          <Text variant="h4" className="font-light">
            {data?.category.name}
          </Text>
          <Text variant="h3" className="font-semi-bold">
            {data?.unitPrice}
          </Text>
          <View className="h-68 my-3 w-full rounded-lg bg-white">
            <Image
              source={{ uri: data?.pictures[selectedImage] }}
              className="my-3 h-72 w-full rounded-lg"
              resizeMode="contain"
              resizeMethod="auto"
            />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            {data?.pictures.map((image, index) => (
              <TouchableOpacity
                className="mr-4 h-28 w-28 rounded-md bg-white"
                key={index}
                onPress={() => changePrincipalImage(index)}>
                <Image
                  source={{ uri: image }}
                  resizeMode="contain"
                  className="mr-4 h-28 w-28 rounded-md"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View className="mb-4 flex-row items-center justify-between">
            <View className="items-center">
              <Text variant="body1" className="mb-3 mr-2 font-bold">
                {common.details_screen.quantity}
              </Text>
              {data?.stock && (
                <DropdownComponent quantity={data.stock} onChange={handleDropdownChange} />
              )}
            </View>
            <View className="w-2/3 items-center">
              <Text variant="body1" className=" mr-2 font-bold">
                {common.details_screen.availability} {data?.stock} {common.details_screen.items}
              </Text>
              {data?.id && (
                <Button
                  className="mt-3 h-12"
                  label={common.labels.buy}
                  variant="primary"
                  textClassName="font-bold text-base"
                  onPress={() => {
                    navigation.navigate('Payment');
                  }}
                />
              )}
            </View>
          </View>
          <View className="mb-4">
            <Text variant="body1" className="mb-3 mr-2 font-bold">
              {common.details_screen.productDescription}
            </Text>
            <Text variant="body1">{data?.description}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
