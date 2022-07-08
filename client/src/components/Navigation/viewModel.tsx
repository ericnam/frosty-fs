import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_NAVIGATION } from "@data/navigation/query";
import { NavigationModel } from "@data/navigation/model";

const NavigationViewModel = () => {
  const navigation = useQuery(GET_NAVIGATION);
  const [navigationData, setNavigationData] = useState<NavigationModel[]>();

  useEffect(() => {
    if (!!!navigation.loading && !!navigation.data) {
      setNavigationData(
        navigation.data.navigation.map((gqlObj: any) => {
          return new NavigationModel(gqlObj);
        })
      );
    }
  }, [navigation.loading]);

  return {
    data: { navigation: { ...navigation, data: navigationData } },
    api: {},
  };
};

export default NavigationViewModel;
