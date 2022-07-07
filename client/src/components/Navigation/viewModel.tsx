import { useQuery } from "@apollo/client";
import { GET_NAVIGATION } from "@data/navigation/query";

const NavigationViewModel = () => {
  return {
    data: { navigation: useQuery(GET_NAVIGATION) },
    api: {},
  };
};

export default NavigationViewModel;
