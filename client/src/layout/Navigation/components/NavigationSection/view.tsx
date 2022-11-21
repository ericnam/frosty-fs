import { INavigationModel } from "@data/navigation/model";
import NavigationSectionItem from "../NavigationSectionItem";
import { INavigationSectionViewModel } from "./viewModel";

const NavigationSectionView = ({
  sectionData,
  marginTier,
  viewModel,
}: {
  sectionData: INavigationModel[] | null | undefined;
  marginTier?: number;
  viewModel: INavigationSectionViewModel;
}): JSX.Element => {
  return (
    <div>
      {!!sectionData &&
        sectionData.map((navigationModel, index) => (
          <NavigationSectionItem
            key={`section-item-${index}`}
            navigationModel={navigationModel}
            marginTier={marginTier ?? 0}
          />
        ))}
    </div>
  );
};

export default NavigationSectionView;
