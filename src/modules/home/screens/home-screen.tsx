import { Image as RNImage } from 'react-native';
import { SafeAreaView } from '../../../ui/core/view';
import CarouselComponent from './carousel-component';
import PaymentMethods from './payment-methods';
import { View } from '../../../ui/core/view';
import { ScrollView } from '../../../ui/core/view';
import { Text } from '../../../ui/core/text';
import { styled } from 'nativewind';
import images from '../../../ui/assets/images/index';

const Image = styled(RNImage);

export const HomeScreen = () => {
  return (
    <SafeAreaView className="bg-background-screen h-[105%]">
      <ScrollView>
        <Image className="w-full" source={images.blackMarketHeader()} />
        <CarouselComponent></CarouselComponent>
        <View className="mt-3 mb-3 flex-row content-center w-full h-40 items-center">
          <Image
            source={require('../../../ui/assets/images/home-page/home-page-middle-image.png')}
            className="w-40 ml-4"
          />
          <View className="w-60 bg-background-promotion rounded-tr-md rounded-br-md ml-0 mr-4 flex h-[131] flex-col items-center justify-center">
            <Text variant='body1' className="text-white font-bold w-3/4">
              Check out our new and restored furniture
            </Text>
            <Text variant='body1' className="text-white w-3/4">Shop today and get a 10% discount!</Text>
          </View>
        </View>
        <View className="bg-white flex items-center justify-center content-center py-9">
          <Text variant='h6' className="font-bold mb-6">
            Payment Methods
          </Text>
          <PaymentMethods />
        </View>
        <View className="mt-7 mb-3 flex-row w-full h-32 items-center mb-8 pr-4">
          <View className="flex-col items-center justify-center w-3/6 ml-4 bg-background-promotion h-[123] rounded-tl-md rounded-bl-md mr-0">
            <Text variant='body1' className="text-white font-bold w-3/4">
              We upgraded our shipments many levels up.
            </Text>
            <Text variant="body1" className="w-3/4 text-white">
              Powered by{' '}
              <Text variant="body1" className="w-3 text-green-300">
                FedEx
              </Text>
            </Text>
          </View>
          <Image
            source={require('../../../ui/assets/images/home-page/anouncement-image.png')}
            className="object-cover mr-8 rounded-tr-8 rounded-br-8 w-56 -ml-4"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
