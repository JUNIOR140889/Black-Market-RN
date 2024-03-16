import { Text, View, Image, StyleSheet } from 'react-native';

export const ProductsScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require('../../../ui/assets/images/logo-black-market/Header.png')}></Image>
      </View>
      <Text>My favourites</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0E0E0',
    paddingTop: 50,
  },
  logo: {
    width: '100%',
  },
});
