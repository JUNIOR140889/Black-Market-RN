import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { common } from '../../../translations/en.json';

const PaymentMethods = () => {
  const handleButtonPress = (buttonIndex: number) => {
    console.log('Button pressed:', buttonIndex);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleButtonPress(0)} style={styles.button}>
        <Image
          source={require('../../../ui/assets/images/home-page/Credit.png')}
          style={styles.image}
        />
        <Text>{common.paymentMethods.credit}</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity onPress={() => handleButtonPress(1)} style={styles.button}>
        <Image
          source={require('../../../ui/assets/images/home-page/Paypal.png')}
          style={styles.image}
        />
        <Text>{common.paymentMethods.paypal}</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity onPress={() => handleButtonPress(2)} style={styles.button}>
        <Image
          source={require('../../../ui/assets/images/home-page/Crypto.png')}
          style={styles.image}
        />
        <Text>{common.paymentMethods.crypto}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  button: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    fontSize: 19,
  },
  separator: {
    height: '100%',
    width: 1,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
});

export default PaymentMethods;
