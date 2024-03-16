import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CarouselComponent from './carousel-component';
import { ScreenWidth } from '@rneui/base';
import PaymentMethods from './payment-methods';

export const HomeScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Image
            style={styles.logo}
            source={require('../../../ui/assets/images/logo-black-market/Header.png')}></Image>
        </View>
        <CarouselComponent></CarouselComponent>
        <View style={styles.promotionsContainer}>
          <Image
            source={require('../../../ui/assets/images/home-page/home-page-middle-image.png')}
            style={styles.promotionImage}
          />
          <View style={styles.promotionTextContainer}>
            <Text style={{ color: '#FFFFFF', fontWeight: 'bold', width: '80%', marginBottom: 5}}>
              Check out our new and restored furniture
            </Text>
            <Text style={{ color: '#FFFFFF', width: '80%' }}>Shop today and get a 10% discount!</Text>
          </View>
        </View>
        <View style={styles.PaymentMethodsContainer}>
          <Text style={{ marginBottom: 25, fontSize: 21, fontWeight: 'bold' }}>
            Payment Methods
          </Text>
          <PaymentMethods />
        </View>
        <View style={styles.anouncementsContainer}>
          <View style={styles.anouncementTextContainer}>
            <Text style={{ color: '#FFFFFF', fontWeight: 'bold', width: '80%', marginBottom: 5 }}>
              We upgraded our shipments many levels up.
            </Text>
            <Text style={{ color: '#FFFFFF', width: '80%', flexWrap: 'nowrap' }}>Powered by 
            <Text style={{ color: 'green', flexWrap: 'nowrap' }}> FedEx </Text>
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
    height: '100%',
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
