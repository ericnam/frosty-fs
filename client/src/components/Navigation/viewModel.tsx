import { useState, useEffect } from "react";
import NavigationRepository from "repositories/navigation.repository";
import NavigationService, {
  INavigationItemsBySection,
} from "services/navigation.service";

const NavigationViewModel = () => {
  const [navigationData, setNavigationData] =
    useState<INavigationItemsBySection>();

  // Gql queries
  const _GetNavigationItems = NavigationRepository.GetNavigationItems();

  // Services
  const [navigationService] = useState(
    new NavigationService({ _GetNavigationItems })
  );

  // Load Initial Data
  useEffect(() => {
    navigationService
      .GetNavigationItemsBySection()
      ?.then((navItemsBySection: INavigationItemsBySection) => {
        setNavigationData(navItemsBySection);
      });
  }, []);

  return {
    data: {
      navigationItemsBySection: !!navigationData ? navigationData : null,
      navigation: { loading: false, data: navigationData },
      // fileSystem: { loading: false, data: fileSystemData },
    },
  };
};

export default NavigationViewModel;
