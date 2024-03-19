import { ScreenWidth } from '@rneui/base';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { common } from '../../../translations/en.json';
import { SafeAreaView } from '../../../ui/core/view';
import CarouselComponent from './carousel-component';
import PaymentMethods from './payment-methods';

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Image
            style={styles.logo}
            source={require('../../../ui/assets/images/logo-black-market/Header.png')}
          />
        </View>
        <CarouselComponent />
        <View style={styles.promotionsContainer}>
          <Image
            source={require('../../../ui/assets/images/home-page/home-page-middle-image.png')}
            style={styles.promotionImage}
          />
          <View style={styles.promotionTextContainer}>
            <Text style={{ color: '#FFFFFF', fontWeight: 'bold', width: '80%', marginBottom: 5 }}>
              {common.homeScreen.checkOutPromotion}
            </Text>
            <Text style={{ color: '#FFFFFF', width: '80%' }}>
              {common.homeScreen.shopTodayDiscount}
            </Text>
          </View>
        </View>
        <View style={styles.PaymentMethodsContainer}>
          <Text style={{ marginBottom: 25, fontSize: 21, fontWeight: 'bold' }}>
            {common.homeScreen.paymentMethods}
          </Text>
          <PaymentMethods />
        </View>
        <View style={styles.anouncementsContainer}>
          <View style={styles.anouncementTextContainer}>
            <Text style={{ color: '#FFFFFF', fontWeight: 'bold', width: '80%', marginBottom: 5 }}>
              {common.homeScreen.shipmentUpgrade}
            </Text>
            <Text style={{ color: '#FFFFFF', width: '80%', flexWrap: 'nowrap' }}>
              {common.homeScreen.poweredByFedEx}
              <Text style={{ color: 'green', flexWrap: 'nowrap' }}>{common.homeScreen.fedEx}</Text>
            </Text>
          </View>
          <Image
            source={require('../../../ui/assets/images/home-page/anouncement-image.png')}
            style={styles.anouncementImage}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F7FA',
    height: '110%',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: '100%',
  },
  promotionsContainer: {
    marginTop: 30,
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    width: ScreenWidth,
    height: 145,
    paddingVertical: 0,
  },
  promotionImage: {
    flex: 1,
    flexWrap: 'wrap',
    margin: 0,
    marginHorizontal: -8,
    resizeMode: 'cover',
    padding: 0,
    height: 145,
    marginLeft: 5,
    marginRight: -18,
  },
  promotionTextContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '35%',
    marginLeft: 0,
    backgroundColor: '#00031A',
    height: '100%',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginRight: 20,
  },
  PaymentMethodsContainer: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  anouncementsContainer: {
    marginTop: 30,
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    width: ScreenWidth,
    height: 135,
    paddingVertical: 0,
  },
  anouncementImage: {
    resizeMode: 'cover',
    padding: 0,
    marginLeft: 4,
    height: 179,
    marginRight: 20,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  anouncementTextContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    marginLeft: 23,
    backgroundColor: '#00031A',
    height: '100%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginRight: -1,
  },
});
