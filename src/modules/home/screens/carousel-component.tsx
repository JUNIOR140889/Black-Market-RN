import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import HearthIcon from './hearth-icon';

const { width: screenWidth } = Dimensions.get('window');

interface Product {
  id: number;
  name: string;
  price: number;
  state: string;
  liked: boolean;
  image: any;
}

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
  {
    id: 5,
    name: 'Another',
    price: 30,
    state: 'Restored',
    liked: true,
    image: {
      uri: 'https://www.ikea.com/us/en/images/products/stefan-chair-brown-black__0727320_pe735593_s5.jpg?f=s',
    },
  },
];

type IconType = {
  focused: boolean;
};

type CarruselImageType = {
  url: string;
};

const Icon = ({ focused, ...props }: IconType) => {
  const fillColor = focused ? 'red' : 'black';

  return (
    <View style={[styles.tabIconContainer, focused && styles.tabIconContainerFocused]}>
      <View style={styles.tabIconWrapper}>
        <HearthIcon stroke={'none'} fill={fillColor} {...props} />
      </View>
    </View>
  );
};

const CarouselComponent: React.FC = () => {
  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.itemContainer}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: '#e9e8e9',
          shadowOpacity: 0.4,
          shadowRadius: 3,
        }}></View>
      <View style={styles.priceState}>
        <Text style={styles.price}>${item.price}</Text>
        <View style={[styles.textContainer, item.state === 'New' && styles.textContainerNew]}>
          <Text style={styles.state}>{item.state}</Text>
        </View>
      </View>
      <View style={styles.nameIcon}>
        <Text style={styles.name}>{item.name}</Text>
        <Icon focused={item.liked} />
      </View>
    </View>
  );

  return (
    <View>
      <Carousel
        data={products}
        layout={'default'}
        renderItem={renderItem}
        sliderWidth={screenWidth * 1.2}
        itemWidth={screenWidth * 0.5}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        contentContainerCustomStyle={styles.carouselContentContainer}
        loop
      />
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: '#076CE0', fontWeight: 'bold', fontSize: 19 }}>See all</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 8,
    paddingBottom: 3,
    shadowRadius: 8,
    shadowOpacity: 0.3,
  },
  priceState: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderColor: 'black',
    borderTopWidth: 1,
  },
  nameIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  image: {
    margin: 10,
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 4,
  },
  price: {
    fontWeight: 'bold',
    alignContent: 'center',
    fontSize: 19,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    padding: 2,
    paddingHorizontal: 4,
    backgroundColor: '#559F21',
  },
  textContainerNew: {
    backgroundColor: '#2751B9',
  },
  state: {
    color: '#FFFFFF',
    fontSize: 19,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 19,
  },
  tabIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    tintColor: 'black',
  },
  tabIconContainerFocused: {
    borderRadius: 50,
    backgroundColor: 'transparent',
  },
  tabIconWrapper: {
    padding: 8,
  },
  carouselContentContainer: {
    display: 'flex',
    backgroundColor: 'transparent',
    paddingVertical: 30,
    alignItems: 'center',
    marginLeft: -screenWidth * 0.3,
  },
});

export default CarouselComponent;
