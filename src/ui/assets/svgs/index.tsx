export default {
    tabHomeIcon: () => require('./tab-home-icon').TabHomeIcon,
    tabSellIcon: () => require('./tab-sell-icon').TabSellIcon,
    tabCartIcon: () => require('./tab-cart-icon').TabCartIcon,
    tabFavoriteIcon: () => require('./tab-favorite-icon').TabFavoriteIcon,
    tabMenuIcon: () => require('./tab-menu-icon').TabMenuIcon,
  } satisfies { [key: string]: () => any };
  