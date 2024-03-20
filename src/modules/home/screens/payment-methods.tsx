import { styled } from 'nativewind';
import React from 'react';
import { Image as RNImage } from 'react-native';

import { common } from '../../../translations/en.json';
import { Text } from '../../../ui/core/text';
import { View } from '../../../ui/core/view';
import { TouchableOpacity } from '../../../ui/core/view';

const Image = styled(RNImage);

const PaymentMethods = () => {
  const handleButtonPress = (buttonIndex: number) => {
    console.log('Button pressed:', buttonIndex);
  };

  return (
    <View className="my-4 h-20 w-4/5 flex-row items-center justify-evenly">
      <TouchableOpacity
        className="mx-3 items-center justify-items-center"
        onPress={() => handleButtonPress(0)}>
        <Image
          source={require('../../../ui/assets/images/home-page/Credit.png')}
          className="mb-4"
        />
        <Text>{common.paymentMethods.credit}</Text>
      </TouchableOpacity>
      <View className="mx-5 h-full w-px bg-black" />
      <TouchableOpacity
        className="mx-3 items-center justify-items-center"
        onPress={() => handleButtonPress(1)}>
        <Image
          source={require('../../../ui/assets/images/home-page/Paypal.png')}
          className="mb-4"
        />
        <Text>{common.paymentMethods.paypal}</Text>
      </TouchableOpacity>
      <View className="mx-5 h-full w-px bg-black" />
      <TouchableOpacity
        className="mx-3 items-center justify-items-center"
        onPress={() => handleButtonPress(2)}>
        <Image
          source={require('../../../ui/assets/images/home-page/Crypto.png')}
          className="mb-4"
        />
        <Text>{common.paymentMethods.crypto}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentMethods;
