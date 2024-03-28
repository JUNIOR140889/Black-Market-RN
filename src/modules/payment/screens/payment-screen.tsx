import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import React, { useRef } from 'react';
import { Image as RNImage } from 'react-native';
import { Checkbox } from 'react-native-paper';

import { common } from '../../../translations/en.json';
import { Button } from '../../../ui/core/nativewind/button';
import { Text } from '../../../ui/core/text';
import { SafeAreaView, ScrollView, View } from '../../../ui/core/view';
import type { BillingAdressFormSubmitHandler } from '../forms/billing-adress-form';
import { BillingAdressForm } from '../forms/billing-adress-form';
import type { BuyFormSubmitHandler } from '../forms/payment-form';
import { BuyForm } from '../forms/payment-form';

const Image = styled(RNImage);

export const PaymentScreen: React.FC = () => {
  const buyFormRef = useRef<BuyForm>(null);
  const billingFormRef = useRef<BuyForm>(null);
  const navigation = useNavigation();

  const [checked, setChecked] = React.useState(true);

  const onSubmitBuyHandler: BuyFormSubmitHandler = () => {
    console.log(buyFormRef.current?.getValues());
  };

  const onSubmitBillingHandler: BillingAdressFormSubmitHandler = () => {
    console.log(billingFormRef.current?.getValues());
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView>
        <View>
          <Image
            className="w-full"
            source={require('../../../ui/assets/images/logo-black-market/Header.png')}
          />
        </View>
        <View className="px-4 py-3">
          <BuyForm ref={buyFormRef} onSubmitHandler={onSubmitBuyHandler} />
          {!checked && (
            <>
              <BillingAdressForm ref={billingFormRef} onSubmitHandler={onSubmitBillingHandler} />
            </>
          )}
          <View className="my-4 flex-row items-center justify-center">
            <View className="h-10 w-10 scale-50 items-center rounded-md border-2 p-0">
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
                color="black"
              />
            </View>
            <Text variant="body1" className="ml-4 w-3/4">
              {common.paymentScreen.useShippingAsBillingAdress}
            </Text>
          </View>
          <Button
            className="mb-3 flex-[0.5]"
            size="large"
            onPress={() => {
              buyFormRef.current?.submit();
              if (!checked) {
                billingFormRef.current?.submit();
              }
            }}
            label={common.buttons.buy}
          />
          <Button
            className="flex-[0.5]"
            size="large"
            onPress={() => {
              navigation.navigate('Tab');
            }}
            variant="primary-inverted"
            label={common.buttons.cancel}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
