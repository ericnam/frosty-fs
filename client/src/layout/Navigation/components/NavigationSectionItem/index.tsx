import { INavigationModel } from "@data/navigation/model";
import NavigationSectionItemView from "./view";
import useNavigationSectionItemViewModel from "./viewModel";

const NavigationSectionItem = ({
  navigationModel,
  marginTier,
}: {
  navigationModel: INavigationModel;
  marginTier: number;
}) => {
  const viewModel = useNavigationSectionItemViewModel(navigationModel);

  return (
    <NavigationSectionItemView
      viewModel={viewModel}
      marginTier={marginTier}
    />
  );
};

export default NavigationSectionItem;
