import { qGetNavigationItems } from "@data/Navigation/queries";

const NavigationViewModel = () => {
  async function getNavigationItems() {
    return await qGetNavigationItems();
  }

  return {
    data: {},
    api: {
      getNavigationItems,
    },
  };
};

export default NavigationViewModel;
