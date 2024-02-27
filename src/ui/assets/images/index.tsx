const images = {
    addPlus: () => require('./add-plus/add-plus.png'),
  };
  
  export type Images = keyof typeof images;
  export default {
    ...images,
  };
  