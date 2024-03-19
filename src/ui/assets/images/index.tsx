const images = {
  backgroundAuth: () => require('./background-auth/background-auth.png'),
  logoBlackMarket: () => require('./logo-black-market/logo-black-market.png'),
  addPlus: () => require('./add-plus/add-plus.png'),
  blackMarketHeader: () => require('./logo-black-market/Header.png'),
};

export type Images = keyof typeof images;
export default {
  ...images,
};
