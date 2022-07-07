import navigationData from "@data/navigation.data";

export default {
  Query: {
    navigation: () => {
      console.log(navigationData);
      return navigationData;
    },
  },
};
